const { verifyToken } = require("../helpers/jwtHelper");
const { User } = require("../models");

const auth = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const [type, token] = access_token.split(" ");
    if (type !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  auth,
};

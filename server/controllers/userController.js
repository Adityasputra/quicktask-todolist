const { comparedPassword } = require("../helpers/bcryptJsHelper");
const { signInToken } = require("../helpers/jwtHelper");
const { User } = require("../models");

module.exports = class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    } catch (error) {
      // console.log(error);
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const validate = error.errors.map((er) => er.message);
        res.status(400).json({
          message: validate,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "CredantiaslRequired",
        });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not Found" });
      }

      const comparedPass = comparedPassword(password, user.password);
      if (!comparedPass) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const access_token = signInToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const validate = error.errors.map((er) => er.message);
        res.status(400).json({
          message: validate,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async googleLogin(req, res) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

    const { email } = ticket.payload

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: Math.random() * 8,
        },
        hooks: false,
      });

      if (!created) {
        if (user.password !== "GoogleLogin") {
          return res.status(403).json({
            message: "Email already registered with different method",
          });
        }
      }

      const access_token = signInToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};

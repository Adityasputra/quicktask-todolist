const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
  console.log("JWT_SECRET_KEY is not defined");
}

const signInToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = {
  signInToken,
  verifyToken,
};

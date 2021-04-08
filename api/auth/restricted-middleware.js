const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  // Authorization: Bearer <token>
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "error logging in " });
      } else {
        req.decodedJWT = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: " you can't pass" });
  }
};

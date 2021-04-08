module.exports = (role) => {
  return function (req, res, next) {
    if ((req?.decodedJWT?.role || "") === role) {
      next();
    } else {
      res.status(403).json({ message: "you're not authorized" });
    }
  };
};

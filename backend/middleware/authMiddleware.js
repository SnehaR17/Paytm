const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  //   jwt.verify(token, jwtsecret)

  const userId = jwt.verify(token, JWT_SECRET);

  req.userId = userId.userId;

  next();
}

module.exports = {
  authMiddleware,
};

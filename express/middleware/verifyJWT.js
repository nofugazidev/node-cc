const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  // console.log(authHeader);
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.sendStatus(403);
    req.user = decode.username;
    req.roles = decode.UserInfo.roles;
    next();
  });
};

module.exports = { verifyJWT };

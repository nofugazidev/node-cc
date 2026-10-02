const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  // console.log(authHeader);
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.sendStatus(403);
    req.user = decode.username;
    next();
  });
};

module.exports = { verifyJWT };

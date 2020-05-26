const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("User not authenticated");

  try {
    const decodedpayload = jwt.verify(token, config.get("jwtprivatekey"));
    req.user = decodedpayload;
    console.log(req.user);
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};

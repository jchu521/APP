const jwt = require("jsonwebtoken");
const config = require("../../server/config");

//Generate id Token
module.exports = data => {
  return jwt.sign(
    {
      ...data,
      test: 1
    },
    config.jwtSecret
  );
};

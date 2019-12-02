const jwt = require("jsonwebtoken");
const config = require("../../server/config");

// const fs = require("fs");
// const RSA_PRIVATE_KEY = fs.readFileSync("./keys/jwtRS256.key");

//Generate jwtBearerToken
module.exports = data => {
  //   return jwt.sign({ data }, RSA_PRIVATE_KEY, {
  //     algorithm: "RS256",
  //     expiresIn: "3m"
  //   });

  /*
    {
      "alg": "RS256",
      "typ": "JWT"
    }
    .
    {
      "iss": "https://example.auth0.com/",
      "aud": "https://api.example.com/calendar/v1/",
      "sub": "usr_123",
      "scope": "read write",
      "iat": 1458785796,
      "exp": 1458872196
    }
  */

  return jwt.sign(
    {
      sub: data
    },
    config.jwtSecret,
    {
      //   algorithm: "RS256",
      expiresIn: "3h"
    }
  );
};

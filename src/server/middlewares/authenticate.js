const jwt = require("jsonwebtoken");
const config = require("../config");
const { User } = require("../models/user.model");

module.exports = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: ["failed to authenticate"] });
      } else {
        let user = await User.findOne({ _id: decoded.sub }).select({
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          role: 1,
          address: 1,
          phone: 1,
          photo: 1,
          accessToken: 1
        });

        if (!user) return res.status(404).json({ message: ["User Not Found"] });

        req.currentUser = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          address: user.address,
          phone: user.phone,
          photo: user.photo
        };
        req.accessToken = user.accessToken;

        next();
      }
    });
  } else {
    return res.status(403).json({ message: ["No token provided"] });
  }
};

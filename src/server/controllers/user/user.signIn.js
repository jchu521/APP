const bcrypt = require("bcrypt");
const { User } = require("../../models/user.model");
const generateBearerToken = require("../../../utils/auth/generateBearerToken");
const generateIdToken = require("../../../utils/auth/generateIdToken");

const signIn = async (req, res) => {
  if (!req.body) return res.status(400).send("NO Body");
  const user = await User.findOne({ "email.address": req.body.email });

  if (!user)
    return res.status(404).send({ message: ["Username or Password is wrong"] });
  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match)
    return res.status(404).send({ message: ["Username or Password is wrong"] });

  var accessToken = generateBearerToken(user._id);

  user.accessToken = accessToken;
  await user.save();

  const idToken = generateIdToken({
    _id: user._id,
    email: user.email.address,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    address: user.address,
    phone: user.phone,
    accessToken: user.accessToken,
    avatar: user.avatar,
    isEmailVerify: user.email.isVerify
  });

  // set it in the HTTP Response body
  return res.status(200).json({
    idToken,
    accessToken,
    expiresIn: 15
  });
};

module.exports = signIn;

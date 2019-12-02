const { User } = require("../../models/user.model");
const { Role } = require("../../models/role.model");
const generateIdToken = require("../../../utils/auth/generateIdToken");

module.exports = async (req, res) => {
  let body = req.body;
  let role = await Role.findOne({ position: body.role.position });
  if (!role) return res.status(404).json({ message: ["Role Not Found"] });

  let user = await User.findOneAndUpdate(
    { _id: req.currentUser._id },
    {
      $set: {
        firstName: body.firstName,
        lastName: body.lastName,
        "email.address": body.email,
        phone: body.phone,
        role: role,
        address: body.address
      }
    },
    { new: true }
  ).select(["-password"]);

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

  if (!user) return res.status(404).json({ message: ["User Not Found"] });

  return res.status(200).send({
    message: ["Updated successfully!"],
    idToken
    // accessToken: user.accessToken,
    // expiresIn: 120
  });
};

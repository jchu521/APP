const { User } = require("../../models/user.model");
const generateIdToken = require("../../../utils/auth/generateIdToken");

module.exports = async (req, res) => {
  const id = req.params.userId;
  const hash = req.params.hash;
  console.log(hash);
  if (!id) return res.status(400).json({ message: ["USER NOT EXISTS"] });

  const user = await User.findOneAndUpdate(
    { _id: id, "email.hash": hash },
    {
      "email.isVerify": true
    },
    { new: true }
  );

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

  console.log(user);
  if (!user) return res.status(400).json({ message: ["USER NOT EXISTS"] });

  return res.status(200).json({ idToken });
};

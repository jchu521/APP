const { User } = require("../../models/user.model");
const generateIdToken = require("../../../utils/auth/generateIdToken");

//https://github.com/bradtraversy/mongo_file_uploads/blob/master/app.js
module.exports = async (req, res) => {
  let user = await User.findOneAndUpdate(
    { _id: req.currentUser._id },
    {
      $set: {
        avatar: {
          _id: req.file.id,
          fileName: req.file.filename
        }
      }
    },
    { new: true }
  ).select(["-password"]);

  const idToken = generateIdToken({
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    address: user.address,
    phone: user.phone,
    accessToken: user.accessToken,
    avatar: user.avatar
  });

  //   if (!user) return res.status(404).json({ message: ["User Not Found"] });

  return res.status(200).send({
    message: ["Updated successfully!"],
    idToken
    // accessToken: user.accessToken,
    // expiresIn: 120
  });
};

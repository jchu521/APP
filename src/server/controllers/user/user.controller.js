const registerAccount = require("./user.register");
const signInAccount = require("./user.signIn");
const updateDetails = require("./user.update");
const uploadingPhoto = require("./user.photo");
const getPhoto = require("./user.avatar");
const verifyEmail = require("./user.verifyEmail");

module.exports = {
  registerAccount,
  signInAccount,
  updateDetails,
  uploadingPhoto,
  getPhoto,
  verifyEmail
};

const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: Object
  },
  "email.isVerify": {
    type: Boolean,
    default: false,
    required: true
  },
  "email.hash": {
    type: String,
    default: uuidv4(),
    required: true
  },
  "email.address": {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  // email: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   minlength: 3,
  //   maxlength: 30
  // },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 255
  },

  accessToken: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  avatar: {
    type: Object
  },
  role: {
    type: Object,
    required: true
  },
  "role._id": {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  "role.position": {
    type: String,
    required: true,
    default: "Client"
  }
});

var User = mongoose.model("User", userSchema);

exports.User = User;

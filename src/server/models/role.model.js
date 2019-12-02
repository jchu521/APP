const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  position: String
});

var Role = mongoose.model("Role", roleSchema);

exports.Role = Role;

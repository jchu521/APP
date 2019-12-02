const { User } = require("../models/user.model");
const { Role } = require("../models/role.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../config");
const uuidv4 = require("uuid/v4");

module.exports = async () => {
  const users = [
    {
      firstName: "Admin",
      lastName: "System",
      email: {
        address: "admin@example.com",
        hash: uuidv4(),
        isVerify: true
      },
      password: "Welcome01!"
    },
    {
      firstName: "SuperManager",
      lastName: "System",
      email: {
        address: "superManager@example.com",
        hash: uuidv4(),
        isVerify: true
      },
      password: "Welcome01!"
    },
    {
      firstName: "Manager",
      lastName: "System",
      email: {
        address: "manager@example.com",
        hash: uuidv4(),
        isVerify: true
      },
      password: "Welcome01!"
    },
    {
      firstName: "Client",
      lastName: "System",
      email: {
        address: "client@example.com",
        hash: uuidv4(),
        isVerify: true
      },
      password: "Welcome01!"
    }
  ];

  users.map(async u => {
    //check exist
    var user = await User.findOne({ email: u.email.address });
    var role = await Role.findOne({ position: u.firstName });

    var hash = bcrypt.hashSync(u.password, saltRounds);
    const accessToken = jwt.sign(
      {
        key: config.accessToken
      },
      "secret"
    );

    if (!user) {
      var createUser = new User({
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        password: hash,
        accessToken: accessToken,
        role
      });
      createUser.save();
    }
  });
};

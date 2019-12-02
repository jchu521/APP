const { Role } = require("../models/role.model");

module.exports = async () => {
  var roles = ["Admin", "SuperManager", "Manager", "Client"];

  roles.map(async r => {
    //check exist
    var role = await Role.findOne({ position: r });

    if (!role) {
      var createRole = new Role({ position: r });
      createRole.save();
    }
  });
};

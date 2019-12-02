const initRoles = require("./role");
const initUsers = require("./user");

exports.init = () => {
  initRoles();
  initUsers();
};

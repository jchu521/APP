const mongoose = require("mongoose");
const initData = require("./init/index");

var dbURI = `mongodb://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASSWORD}@ds155714.mlab.com:55714/${process.env.REACT_APP_DB_NAME}`;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to mLab `))
  .catch(() => console.error("could not connect to mLab"));

var conn = mongoose.connection;

conn.once("open", function() {
  initData.init();
});

module.exports = conn;

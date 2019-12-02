const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/auth");
const user = require("./routes/user");

require("./db");
require("./Email/index");

app.use(cors());

// Prefix of API
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);

app.get("/public", (req, res) => {
  return res.json({ message: "Hi" });
});

app.listen(3001, () => {
  console.log(`Server`);
});

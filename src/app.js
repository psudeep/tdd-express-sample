const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

const User = require("./user/User");

app.post("/api/v1/users", (req, res) => {
  const payload = req.body;
  // console.log("body", payload);
  User.create(payload).then(() => {
    return res.send({ message: "user created" });
  });
});

module.exports = app;

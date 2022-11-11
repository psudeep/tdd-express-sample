const express = require("express");
const app = express();
const UserRouter = require("./user/UserRouter");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

app.use(UserRouter);

module.exports = app;

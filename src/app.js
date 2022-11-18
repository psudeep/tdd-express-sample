const express = require("express");
const app = express();
const UserRouter = require("./user/UserRouter");
const bodyParser = require("body-parser");

const authRouters = require("./routers/authRoutes");

app.use(express.json());
app.use(bodyParser.json());

app.use(UserRouter);
app.use("/api/v1/auth", authRouters);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, ...err };
  // console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

console.log("env is " + process.env.NODE_ENV);

module.exports = app;

const express = require("express");
const morgan = require("morgan");
const app = express();

const sayHello = (req, res, next) => {
  res.send("Hello!");
  next();
};



app.get("/hello", sayHello)

app.use(morgan("dev"));


module.exports = app;
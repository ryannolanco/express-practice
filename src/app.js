const express = require("express");
const morgan = require("morgan");
const app = express();

const sayHello = (req, res, next) => {
  res.send("Hello!");
  next();
};



app.use(sayHello);
app.use(morgan("dev"));


module.exports = app;
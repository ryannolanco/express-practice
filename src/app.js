const express = require("express");
const morgan = require("morgan");
const app = express();

const sayHello = (req, res, next) => {
  res.send('Hello!');
  next();
};


app.use(morgan("dev"));
app.get('/hello', sayHello)

app.get('/songs', (req, res) => {
  const title = req.query.title;
  res.send(title)
})


module.exports = app;
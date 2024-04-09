const express = require("express");
const morgan = require("morgan");
const app = express();

const sayHello = (req, res, next) => {
  console.log(req.query);
  const name = req.query.name;
  const content = name ? `Hello, ${name}!` : 'Hello!';
  res.send(content)
};

const saySomething = (req, res) => {
  const greeting = req.params.greeting;
  const content = `${greeting}!`;
  res.send(`${greeting}!`)
}

app.use(morgan("dev"));
app.get('/hello', sayHello)
app.get('/say/:greeting', saySomething)


app.get('/songs', (req, res) => {
  const title = req.query.title;
  res.send(title)
})


module.exports = app;
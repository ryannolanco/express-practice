const express = require("express");
const morgan = require("morgan");
const app = express();


//SERVER FUNCTIONS
const sayHello = (req, res, next) => {
  console.log(req.query);
  const name = req.query.name;
  const content = name ? `Hello, ${name}!` : 'Hello!';
  res.send(content)
};


const saySomething = (req, res) => {
  const greeting = req.params.greeting;
  const name = req.query.name;

  const content = greeting && name ? `${greeting}, ${name}!` : `${greeting}!`;
  res.send(content);
};

const sayGoodbye = (req, res) => {
  res.send("Sorry to see you go!");
};

const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next("State abbreviation is invalid.");
  } else {
    next();
  }
};

//SERVER ROUTES
app.use(morgan("dev"));
app.get('/hello', sayHello)
app.get('/say/goodbye', sayGoodbye)
app.get('/say/:greeting', saySomething)


app.get('/songs', (req, res) => {
  const title = req.query.title;
  res.send(title)
})

app.get("/states/:abbreviation", (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next("State abbreviation is invalid.");
  } else {
    res.send(`${abbreviation} is a nice state, I'd like to visit.`);
  }
});


//ROUTER LEVEL MIDDLEWARE 
app.get(
  "/states/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`${req.params.abbreviation} is a nice state, I'd like to visit.`);
  }
);

app.get(
  "/travel/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`Enjoy your trip to ${req.params.abbreviation}!`);
  }
);

//ERROR HANDLERS
app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});



module.exports = app;
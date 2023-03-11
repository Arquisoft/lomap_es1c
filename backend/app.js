const express = require('express');
const session = require('express-session');

//Inicializa app
let app = express();

let expressSession = require('express-session');
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));

let bodyParser = require('body-parser');

app.use(bodyParser.json());

//RUTAS
const userSessionRouter = require('./routes/userSessionRouter');
app.use("/location", userSessionRouter);
app.use("/review", userSessionRouter);


//CONTROLLERS
const locationController = require('./controllers/locationController');
const authController = require("./controllers/authController")
const reviewController = require("./controllers/reviewController")

// Middlewares

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  // Debemos especificar todas las headers que se aceptan. Content-Type , token
  next();
});
app.use(express.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

//ROUTES
let indexRouter = require('./routes/index')(app,authController);
require("./routes/locationRoutes.js")(app,locationController);
require("./routes/reviewRoutes.js")(app,reviewController);




app.use('/', indexRouter);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
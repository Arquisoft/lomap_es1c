const express = require('express');
const cookieSession = require("cookie-session");
const cors = require('cors');

//Inicializa app
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  // Debemos especificar todas las headers que se aceptan. Content-Type , token
  next();
});

app.use(
  cookieSession({
    name: "session",
    // These keys are required by cookie-session to sign the cookies.
    keys: [
      "Required, but value not relevant for this demo - key1",
      "Required, but value not relevant for this demo - key2",
    ],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);


//CONTROLLERS
const authController = require('./controllers/AuthController');
const locationController = require('./controllers/locationController');
const friendController = require("./controllers/FriendController")
const routeController =require ('./controllers/RouteController');

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

const userSessionRouter=require("./routes/userSessionRouter");
//Router

app.use("/location", userSessionRouter);
app.use("/review", userSessionRouter);
app.use("/friend",userSessionRouter);
app.use("/route",userSessionRouter);

//ROUTES

require("./routes/AuthRoutes.js")(app,authController);
require("./routes/locationRoutes.js")(app,locationController);
require("./routes/FriendRoutes.js")(app,friendController);
require("./routes/RouteRoutes.js")(app,routeController);


// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`);
});

module.exports = app;
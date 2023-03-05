//Utilizamos express para guardar la sesion, donde almacenamos el webID.
const express = require('express');
const session = require('express-session');

//const solid = require('./Solid');
//const authRoutes = require('./routes/AuthRoutes');
const locationRoutes = require('./routes/LocationRoutes');
//const reviewRoutes = require('./routes/ReviewRoutes');

const app = express();


// Middlewares
app.use(express.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));
// Routes

//app.use('/auth', authRoutes);
app.use('/locations', locationRoutes);
//app.use('/reviews', reviewRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`RestApi server started on port ${PORT}`);
});
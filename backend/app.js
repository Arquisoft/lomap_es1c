const express = require('express');
const session = require('express-session');
const solid= require('./solid/Solid.js');
//const authRoutes = require('./routes/AuthRoutes.js');
const locationRoutes = require('./routes/LocationRoutes.js');
//const reviewsRoutes = require('./routes/ReviewRoutes.js');

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
//app.use('/reviews', reviewsRoutes);

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
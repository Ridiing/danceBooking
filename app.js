// Load environment variables
require('dotenv').config();

// External packages
const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Create express app instance
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'supersecretkey', // for dev only
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});


// Routes (put these AFTER app is declared!)
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', courseRoutes);
app.use('/', bookingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


require('dotenv').config();
const express       = require('express');
const mustacheExpress = require('mustache-express');
const session       = require('express-session');
const bodyParser    = require('body-parser');
const path          = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// set up Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false
}));

// expose `user` to all templates
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// routes
const indexRoutes   = require('./routes/index');
const authRoutes    = require('./routes/authRoutes');
const courseRoutes  = require('./routes/courseRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', courseRoutes);
app.use('/', bookingRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

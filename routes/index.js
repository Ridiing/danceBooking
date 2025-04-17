const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome to the Dance Organisation',
    user: req.session.user
  });
});

router.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  res.render('dashboard', {
    user: req.session.user,
    isOrganiser: req.session.user.role === 'organiser'
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About DanceBooking'
  });
});

module.exports = router;

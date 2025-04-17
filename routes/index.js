const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('dashboard', {
    isOrganiser: req.session.user.role === 'organiser'
  });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;

// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to the Dance Organisation' });
});

module.exports = router;

router.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    
    res.render('dashboard', { 
      user: req.session.user,
      isOrganiser: req.session.user.role === 'organiser'
    });
  });
  
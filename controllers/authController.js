const bcrypt = require('bcryptjs');
const userDB = require('../models/userDB');

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.register = (req, res) => {
  const { username, password, role } = req.body;

  userDB.findOne({ username }, (err, existingUser) => {
    if (err) return res.send('Error checking for existing user');
    if (existingUser) {
      return res.render('register', { error: 'Username already exists. Please choose another.' });
    }

    const user = {
      username,
      password,
      role: role || 'student'
    };

    userDB.insert(user, (err, newUser) => {
      if (err) return res.send('Error registering user');
      req.session.user = newUser;
      res.redirect('/dashboard');
    });
  });
};



exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  userDB.findOne({ username }, async (err, user) => {
    if (!user) return res.render('login', { error: 'User not found.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('login', { error: 'Incorrect password.' });

    req.session.user = user;
    res.redirect('/dashboard');
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

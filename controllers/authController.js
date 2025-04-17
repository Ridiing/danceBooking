const bcrypt = require('bcryptjs');
const userDB = require('../models/userModel');

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  userDB.insert({ username, password: hashedPassword, role }, (err, newUser) => {
    if (err) return res.send('Error registering user');
    req.session.user = newUser;
    res.redirect('/dashboard');
  });
};

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  userDB.findOne({ username }, async (err, user) => {
    if (!user) return res.send('User not found');
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send('Incorrect password');
    
    req.session.user = user;
    res.redirect('/dashboard');
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

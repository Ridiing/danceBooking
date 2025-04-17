const userDB = require('../models/userDB');

exports.manageUsers = (req, res) => {
  userDB.find({}, (err, users) => {
    if (err) return res.send('Failed to load users');
    
    const filteredUsers = users.map(user => ({
      ...user,
      isNotSelf: user._id !== req.session.user._id,
      isOrganiser: user.role === 'organiser'
    }));

    res.render('manageUsers', {
      users: filteredUsers,
      user: req.session.user
    });
  });
};

exports.makeOrganiser = (req, res) => {
  userDB.update({ _id: req.params.id }, { $set: { role: 'organiser' } }, {}, (err) => {
    if (err) return res.send('Failed to promote user');
    res.redirect('/manage-users');
  });
};

exports.deleteUser = (req, res) => {
  if (req.params.id === req.session.user._id) {
    return res.send("You can't delete yourself!");
  }

  userDB.remove({ _id: req.params.id }, {}, (err) => {
    if (err) return res.send('Failed to delete user');
    res.redirect('/manage-users');
  });
};

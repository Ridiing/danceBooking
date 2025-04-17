const userDB = require('../models/userDB');

exports.manageUsers = (req, res) => {
  userDB.find({}, (err, users) => {
    if (err) return res.status(500).send('Error fetching users');
    const filtered = users.filter(u => u._id !== req.session.user._id)
      .map(u => ({ ...u, isOrganiser: u.role === 'organiser' }));
    res.render('manageUsers', { users: filtered });
  });
};

exports.makeOrganiser = (req, res) => {
  userDB.update({ _id: req.params.id }, { $set: { role: 'organiser' } }, {}, () => {
    res.redirect('/manage-users');
  });
};

exports.deleteUser = (req, res) => {
  userDB.remove({ _id: req.params.id }, {}, () => {
    res.redirect('/manage-users');
  });
};

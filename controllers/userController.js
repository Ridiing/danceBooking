// controllers/userController.js
const userDB = require('../models/userDB');

exports.manageUsers = (req, res) => {
  userDB.find({}, (err, users) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Error fetching users');
    }

    console.log('All users in DB:', users);

    const nonCurrentUsers = users.filter(
      u => u._id !== req.session.user._id
    );

    res.render('manageUsers', {
      users: nonCurrentUsers.map(user => ({
        ...user,
        isOrganiser: user.role === 'organiser'
      }))
    });
  });
};

exports.makeOrganiser = async (req, res) => {
  try {
    const userId = req.params.id;
    await userDB.update({ _id: userId }, { $set: { role: 'organiser' } });
    res.redirect('/manage-users');
  } catch (err) {
    console.error("Error promoting user:", err);
    res.status(500).send("Failed to promote user.");
  }
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  userDB.remove({ _id: userId }, {}, (err, numRemoved) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send('Failed to delete user.');
    }
    res.redirect('/manage-users');
  });
};

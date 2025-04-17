const userDB = require('../models/userDB');

// Show manage users page (organisers only)
exports.manageUsers = (req, res) => {
  userDB.find({}, (err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send("Server error");
    }

    console.log("All users in DB:", users); // Debug

    const filteredUsers = users
      .filter(user => user._id !== req.session.user._id)
      .map(user => ({
        ...user,
        isOrganiser: user.role === 'organiser'
      }));

    console.log("Filtered users:", filteredUsers); // Debug

    res.render('manageUsers', { users: filteredUsers });
  });
};

// Promote a user to organiser
exports.makeOrganiser = (req, res) => {
  const userId = req.params.id;

  userDB.update({ _id: userId }, { $set: { role: 'organiser' } }, {}, (err, numReplaced) => {
    if (err) {
      console.error("Error promoting user:", err);
      return res.status(500).send("Failed to promote user.");
    }

    console.log(`User ${userId} promoted to organiser.`);
    res.redirect('/manage-users');
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  userDB.remove({ _id: userId }, {}, (err, numRemoved) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).send("Failed to delete user.");
    }

    console.log(`User ${userId} deleted.`);
    res.redirect('/manage-users');
  });
};

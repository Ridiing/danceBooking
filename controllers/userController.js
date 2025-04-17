const userDB = require('../models/userDB');

// Show manage users page (organisers only)
const userDB = require('../models/userDB');

exports.manageUsers = async (req, res) => {
  try {
    const users = await userDB.find({}); 
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
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
};

  
  

// Promote a user to organiser
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
  

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      await userDB.remove({ _id: userId });
      res.redirect('/manage-users');
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Failed to delete user.");
    }
  };
  

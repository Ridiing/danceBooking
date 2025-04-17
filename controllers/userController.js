const userDB = require('../models/userDB');

// Show manage users page (organisers only)
exports.manageUsers = async (req, res) => {
    try {
      const users = await userDB.find({});
      console.log("All users in DB:", users);
  
      const filteredUsers = users
        .filter(user => user._id !== req.session.user._id)
        .map(user => ({
          ...user,
          isOrganiser: user.role === 'organiser'
        }));
  
      console.log("Filtered users:", filteredUsers);
  
      res.render('manageUsers', { users: filteredUsers });
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Server error");
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
  

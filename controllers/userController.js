exports.manageUsers = (req, res) => {
    userDB.find({}, (err, users) => {
      if (err) return res.send('Error loading users');
      res.render('manageUsers', { users });
    });
  };
  
  exports.makeOrganiser = (req, res) => {
    userDB.update({ _id: req.params.id }, { $set: { role: 'organiser' } }, {}, (err) => {
      if (err) return res.send('Error updating user');
      res.redirect('/manage-users');
    });
  };
  
  exports.deleteUser = (req, res) => {
    userDB.remove({ _id: req.params.id }, {}, (err) => {
      if (err) return res.send('Error deleting user');
      res.redirect('/manage-users');
    });
  };
  
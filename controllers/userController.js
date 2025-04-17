const userDB = require('../models/userDB');

function findUsers(query) {
  return new Promise((resolve, reject) => {
    userDB.find(query, (err, docs) => {
      if (err) return reject(err);
      resolve(docs);
    });
  });
}

exports.manageUsers = async (req, res) => {
  try {
    const users = await findUsers({});
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

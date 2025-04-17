// models/userDB.js
const db = require('./db'); // or however you access your DB

module.exports = {
  getAllUsers: async () => {
    return db.get('users').value(); // example using lowdb or similar
  },

  deleteUserById: async (id) => {
    return db.get('users').remove({ id }).write();
  },

  makeOrganiser: async (id) => {
    return db.get('users').find({ id }).assign({ role: 'organiser' }).write();
  }
};

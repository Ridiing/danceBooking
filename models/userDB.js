const path = require('path');
const Datastore = require('nedb-promises');

const userDB = Datastore.create({
  filename: path.join(__dirname, '../data/nedb/users.db'),
  autoload: true,
});

module.exports = userDB;


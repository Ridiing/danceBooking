const path = require('path');
const Datastore = require('nedb');

const userDB = new Datastore({
  filename: path.join(__dirname, '../data/users.db'), // not nedb/users.db
  autoload: true,
});

module.exports = userDB;



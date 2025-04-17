const Datastore = require('nedb-promises');
const path = require('path');

const userDB = Datastore.create({
  filename: path.join(__dirname, 'data', 'users.db'),
  autoload: true
});

module.exports = userDB;


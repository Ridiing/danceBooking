const path      = require('path');
const Datastore = require('nedb');
module.exports = new Datastore({
  filename: path.join(__dirname, '../data/bookings.db'),
  autoload: true
});

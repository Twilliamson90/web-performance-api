let config = require('../config');
let mysql = require('mysql');

let db = mysql.createConnection(config.db);

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('Mysql connected..')
});

module.exports = db;
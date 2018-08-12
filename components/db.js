// Database
const config = require('../config');
const mysql = require('mysql');
const db = mysql.createConnection(config.development.database);

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('Mysql connected..')
});

module.exports = db;
const db = require('./db');

class Base {

  constructor() {
    this.tableName = 'base';
  }

  create(tableData) {
    const sql = 'INSERT INTO ?? SET ?';
    console.log(this.tableName);
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, tableData], (err, result) => {
        if(err) throw err;
        resolve(result);
      });
    });
  }

  findAll() {
    console.log(this.tableName);
    const sql = 'SELECT * FROM ??';
    return new Promise((resolve, reject) => {
      db.query(sql, this.tableName, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  findById(id) {
    const sql = 'SELECT * FROM ?? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, id], (err, result) => {
        if(err) throw err;
        resolve(result[0]);
      });
    });
  }

  findOne(searchData) {
    console.log(searchData);
    const sql = 'SELECT * FROM ?? WHERE ? = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, searchData], (err, result) => {
        if(err) throw err;
        resolve(result[0]);
      });
    });
  }

}

module.exports = Base;
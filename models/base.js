let db = require('./db');

let base = {

  create: function(tableData) {
    let sql = 'INSERT INTO ?? SET ?';
    console.log(this.tableName);
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, tableData], (err, result) => {
        if(err) throw err;
        resolve(result);
      });
    });
  },

  findAll: function() {
    console.log(this.tableName);
    let sql = 'SELECT * FROM ??';
    return new Promise((resolve, reject) => {
      db.query(sql, this.tableName, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  },

  findById: function(id) {
    let sql = 'SELECT * FROM ?? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, id], (err, result) => {
        if(err) throw err;
        resolve(result);
      });
    });
  }

};

module.exports = base;
let db = require('../controllers/db');

let base = {

  tableName: '',

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

  getAll: function() {
    let sql = 'SELECT * FROM ??';
    return new Promise((resolve, reject) => {
      db.query(sql, this.tableName, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  },

  getById: function(id) {
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
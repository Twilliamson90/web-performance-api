let db = require('./db');
let base = require('./base');

base.tableName = 'scores';

base.findScoresBySiteId = function(siteId) {
  let sql = 'SELECT * FROM ?? WHERE site_id = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [this.tableName, siteId], (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
};

module.exports = base;
let db = require('./db');
let base = require('./base');

base.tableName = 'sites';

base.findSitesByBoardId = function(boardId) {
  let sql = 'SELECT * FROM ?? WHERE board_id = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [this.tableName, boardId], (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
};

module.exports = base;
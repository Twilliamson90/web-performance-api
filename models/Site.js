const db = require('./db');
const Base = require('./Base');

class Site extends Base {

  constructor() {
    super();
    this.tableName = 'sites';
  }

  findSitesByBoardId(boardId) {
    const sql = 'SELECT * FROM ?? WHERE board_id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, boardId], (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

}

module.exports = Site;
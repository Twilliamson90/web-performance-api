const db = require('./db');
const Base = require('./Base');

class Score extends Base {

  constructor() {
    super();
    this.tableName = 'scores';
  }

  findScoresBySiteId(siteId) {
    const sql = 'SELECT * FROM ?? WHERE site_id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, siteId], (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  findRecentScoresBySiteId(siteId) {
    const sql = 'SELECT * FROM ?? WHERE site_id = ? ORDER BY create_time DESC LIMIT 3';
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, siteId], (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

}

module.exports = Score;
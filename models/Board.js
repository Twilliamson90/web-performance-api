const db = require('./db');
const Base = require('./Base');

class Board extends Base {

  constructor() {
    super();
    this.tableName = 'boards';
  }

  findBySlug(slug) {
    const sql = 'SELECT * FROM ?? WHERE slug = ? LIMIT 1';
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, slug], (err, result) => {
        if(err) throw err;
        resolve(result[0]);
      });
    });
  }

  findSites(boardId) {

  }

}

module.exports = Board;
const Base = require('./Base');

class Board extends Base {

  constructor() {
    super();
    this.tableName = 'boards';
  }

}

module.exports = Board;
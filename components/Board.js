const db = require('./db');
const shortid = require('shortid');

const Board = {

  getAllBoards: function(req, res) {
    const sql = 'SELECT * FROM boards WHERE 1 = 1';
    const query = db.query(sql, (err, result) => {
      if(err) throw err;
      // console.log(result);
      res.json(result);
    });
  },

  getBoardById: function(req, res) {
    const boardId = req.params.id;
    const sql = 'SELECT * FROM boards WHERE id = ?';
    const query = db.query(sql, boardId, (err, result) => {
      if(err) throw err;
      res.json(result);
    });
  },

  addBoard: async function(req) {
    // console.log(req.body);
    const boardName = req.body.boardName;
    const boardPath = boardName.replace(/\s+/g, '-').toLowerCase() + '-' + shortid.generate();
    const board = {name: boardName, path: boardPath};
    const sql = 'INSERT INTO boards SET ?';

    const query = await db.query(sql, board, (err, result) => {
      if(err) throw err;
      // console.log(result);
      return result;
    });
  }

};

module.exports = Board;
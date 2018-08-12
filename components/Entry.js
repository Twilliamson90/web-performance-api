const db = require('./db');

const Entry = {

  getEntriesForBoard: function(req, res) {
    const boardId = req.params.id;
    const sql = 'SELECT * FROM entries WHERE board_id = ?';
    const query = db.query(sql, boardId, (err, result) => {
      if(err) throw err;
      res.json(result);
    });
  },

  getEntryById: function(req, res) {
    const entryId = req.params.id;
    const sql = 'SELECT * FROM entries WHERE id = ?';
    const query = db.query(sql, entryId, (err, result) => {
      if(err) throw err;
      res.json(result);
    });
  },

  addEntry: function(req, res) {
    const reqEntry = {...req.body};

    const entry = {
      display_name: reqEntry.displayName,
      url: reqEntry.url,
      board_id: req.params.id
    };
    const sql = 'INSERT INTO entries SET ?';
    const query = db.query(sql, entry, (err, result) => {
      if(err) throw err;
      // console.log(result);
      res.json(result);
    });
  }

};

module.exports = Entry;
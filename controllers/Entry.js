let db = require('./db');

let Entry = {

  getEntriesForBoard: function(req, res) {
    let boardId = req.params.id;
    let sql = 'SELECT * FROM sites WHERE board_id = ?';
    let query = db.query(sql, boardId, (err, result) => {
      if(err) throw err;
      res.json(result);
    });
  },

  getEntryById: function(req, res) {
    let entryId = req.params.id;
    let sql = 'SELECT * FROM sites WHERE id = ?';
    let query = db.query(sql, entryId, (err, result) => {
      if(err) throw err;
      res.json(result);
    });
  },

  addEntry: function(req, res) {
    let reqEntry = {...req.body};

    let entry = {
      display_name: reqEntry.displayName,
      url: reqEntry.url,
      board_id: req.params.id
    };
    let sql = 'INSERT INTO sites SET ?';
    let query = db.query(sql, entry, (err, result) => {
      if(err) throw err;
      // console.log(result);
      res.json(result);
    });
  }

};

module.exports = Entry;
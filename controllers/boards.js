const shortid = require('shortid');
const Board = new (require('../models/board'));

const boards = {

  create: async function(req) {
    const boardName = req.body.boardName;
    const boardSlug = boardName.replace(/\s+/g, '-').toLowerCase() + '-' + shortid.generate();
    const board = {name: boardName, slug: boardSlug};
    return await Board.create(board);
  },

  findAll: async function() {
    return await Board.findAll();
  },

  findById: async function(boardId) {
    return await Board.findById(boardId);
  }

};

module.exports = boards;
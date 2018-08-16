let shortid = require('shortid');
let Board = require('../models/board');

let boards = {

  create: async function(req) {
    let boardName = req.body.boardName;
    let boardSlug = boardName.replace(/\s+/g, '-').toLowerCase() + '-' + shortid.generate();
    let board = {name: boardName, slug: boardSlug};
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
let db = require('./db');
let shortid = require('shortid');
let Board = require('../models/board');

let boards = {

  getAllBoards: async function() {
    return await Board.getAll();
  },

  getBoardById: async function(boardId) {
    return await Board.getById(boardId);
  },

  addBoard: async function(req) {
    let boardName = req.body.boardName;
    let boardSlug = boardName.replace(/\s+/g, '-').toLowerCase() + '-' + shortid.generate();
    let board = {name: boardName, slug: boardSlug};
    return await Board.create(board);
  }

};

module.exports = boards;
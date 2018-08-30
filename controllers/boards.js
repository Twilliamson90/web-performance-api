const shortid = require('shortid');
const Board = new (require('../models/Board'));
const Site = new (require('../models/Site'));

const boards = {

  create: async function(req) {
    const boardName = req.body.boardName;
    const boardSlug = boardName.replace(/\s+/g, '-').toLowerCase() + '-' + shortid.generate();
    const board = {
      name: boardName,
      slug: boardSlug,
      owner_id: req.user.id
    };
    const newBoard = await Board.create(board);
    if(newBoard.affectedRows === 1) {
      return board;
    }
  },

  findAll: async function() {
    return await Board.findAll();
  },

  findBySlug: async function(slug) {
    console.log(slug);
    let boardData = {};
    boardData.meta = await Board.findBySlug(slug);
    boardData.sites = await Site.findSitesByBoardId(boardData.meta.id);
    return boardData;
  },

  findById: async function(boardId) {
    return await Board.findById(boardId);
  }

};

module.exports = boards;
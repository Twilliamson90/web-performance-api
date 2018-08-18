const shortid = require('shortid');
const Board = new (require('../models/board'));
const Site = new (require('../models/Site'));

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

  findBySlug: async function(slug) {
    let boardData = {};
    boardData.meta = await Board.findBySlug(slug);
    boardData.sites = await Site.findSitesByBoardId(boardData.meta.id);
    console.log(boardData);
    return boardData;
  },

  findById: async function(boardId) {
    return await Board.findById(boardId);
  }

};

module.exports = boards;
const Site = new (require('../models/Site'));
const Board = new (require('../models/Board'));
const scores = require('../controllers/scores');

const sites = {

  create: async function(req) {
    const reqSite = {...req.body};
    const displayName = reqSite.displayName;
    const url = reqSite.url;
    const parentBoard = await Board.findBySlug(req.params.id);
    const boardId = parentBoard.id;

    if(parentBoard.owner_id !== req.user.id) {
      throw "A user cannot add sites to a board they don't own";
    }

    const site = {
      display_name: displayName,
      url,
      board_id: boardId
    };
    const newSite = await Site.create(site);
    if(newSite.affectedRows === 1) {
      scores.runAudit(newSite.insertId);
      return site;
    }
  },

  findSitesByBoardId: async function(boardId) {
    return await Site.findSitesByBoardId(boardId);
  },

  updateCurrentScore: async function(score) {
    return await Site.updateCurrentScore(score);
  },

  removeSite: async function(req) {
    const boardId = req.params.boardId;
    const siteId = req.params.siteId;
    const parentBoard = await Board.findById(boardId);

    if(parentBoard.owner_id !== req.user.id) {
      throw "A user cannot delete sites from a board they don't own";
    }

    const removedSite = await Site.removeSite(siteId, boardId);
    if(removedSite.affectedRows === 1) {
      return {"success": true};
    }

    return await Site.removeSite(siteId, boardId);
    //return await Board.removeSite(siteId, boardId)
  }

};

module.exports = sites;
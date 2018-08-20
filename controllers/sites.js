const Site = new (require('../models/Site'));
const Board = new (require('../models/Board'));
const scores = require('../controllers/scores');

const sites = {

  create: async function(req) {
    const reqSite = {...req.body};
    const boardId = await Board.findBySlug(req.params.id);

    const site = {
      display_name: reqSite.displayName,
      url: reqSite.url,
      board_id: boardId.id
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
  }

};

module.exports = sites;
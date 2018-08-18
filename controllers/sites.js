const Site = new (require('../models/Site'));

const sites = {

  create: async function(req) {
    const reqSite = {...req.body};
    const site = {
      display_name: reqSite.display_name,
      url: reqSite.url,
      board_id: req.params.id
    };
    return await Site.create(site);
  },

  findSitesByBoardId: async function(boardId) {
    return await Site.findSitesByBoardId(boardId);
  },

  updateCurrentScore: async function(score) {
    return await Site.updateCurrentScore(score);
  }

};

module.exports = sites;
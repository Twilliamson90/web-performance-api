const Site = new (require('../models/Site'));

const sites = {

  create: async function(req) {
    const reqSite = {...req.body};
    const site = {
      display_name: reqSite.displayName,
      url: reqSite.url,
      board_id: req.params.id
    };
    return await Site.create(site);
  },

  findSitesByBoardId: async function(boardId) {
    return await Site.findSitesByBoardId(boardId);
  }

};

module.exports = sites;
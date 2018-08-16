let Site = require('../models/Site');

let sites = {

  create: async function(req) {
    let reqSite = {...req.body};
    let site = {
      display_name: reqSite.displayName,
      url: reqSite.url,
      board_id: req.params.id
    };
    return await Site.create(site);
  },

  findSitesByBoardId: async function(boardId) {
    return await Site.findSitesByBoardId(boardId);
  },

};

module.exports = sites;
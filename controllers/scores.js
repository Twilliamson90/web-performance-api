const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const Score = new (require('../models/Score'));
const Site = new (require('../models/Site'));

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

const launchChromeAndRunLighthouse = function(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      return chrome.kill().then(() => results.lhr)
    });
  });
};

const getScore = async function(url) {
  const opts = {
    chromeFlags: ['--headless']
  };
  return new Promise((resolve, reject) => {
    launchChromeAndRunLighthouse(url, opts).then(results => {
      resolve(results.audits['speed-index'].rawValue);
    });
  });
};

const updateCurrentScore = async function(siteId) {
  let scores = await Score.findRecentScoresBySiteId(siteId);
  scores = scores.map(score => score.speed_index);
  let newScore = {};
  newScore.site_id = siteId;
  newScore.speed_index = average(scores);
  return await Site.updateCurrentScore(newScore);
};

const scores = {

  runAudit: async function(siteId) {
    console.log('Audit running on siteId: ' + siteId);
    const siteToAudit = await Site.findById(siteId);
    const auditUrl = siteToAudit.url;
    let newScore = {};
    newScore.speed_index = await getScore(auditUrl);
    newScore.site_id = siteId;
    // console.log(scores);
    console.log('audit finished');
    await Score.create(newScore);
    await updateCurrentScore(siteId);
    return newScore;
  },

  findScoresBySiteId: async function(siteId) {
    return await Score.findScoresBySiteId(siteId);
  },

  updateBoard: async function(boardId) {
    const sitesToUpdate = await Site.findSitesByBoardId(boardId);
    console.log('Updating board');
    console.log(sitesToUpdate);
    sitesToUpdate.forEach(site => {
      console.log(site);
      this.runAudit(site.id);
    });
    return true;
  }

};

module.exports = scores;
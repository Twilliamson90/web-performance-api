const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const Score = new (require('../models/Score'));
const Site = new (require('../models/Site'));

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

const scores = {

  runAudit: async function(siteId) {
    const siteToAudit = await Site.findById(siteId);
    const auditUrl = siteToAudit.url;
    let score = {};
    score.speed_index = await getScore(auditUrl);
    score.site_id = siteId;

    return await Score.create(score);
  },

  findScoresBySiteId: async function(siteId) {
    return await Score.findScoresBySiteId(siteId);
  }

};

module.exports = scores;
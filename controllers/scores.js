let db = require('../models/db');
let lighthouse = require('lighthouse');
let chromeLauncher = require('chrome-launcher');
let Score = require('../models/Score');

function launchChromeAndRunLighthouse(url, opts, config = null) {
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

let scores = {

  addScore: function(siteId) {

    let sql = 'SELECT * FROM entries WHERE id = ? LIMIT 1';
    let query = db.query(sql, siteId, (err, result) => {
      if(err) throw err;
      console.log(result);
      let testUrl = result[0].url;

      let opts = {
        chromeFlags: ['--headless']
      };

      launchChromeAndRunLighthouse(testUrl, opts).then(results => {
        let score = {
          'site_id': siteId,
          'speed_index': results.audits['speed-index'].rawValue
        };
        let sql = 'INSERT INTO scores SET ?';
        let query = db.query(sql, score, (err, result) => {
          if(err) throw err;
          res.json(result);
        });
      });
    });
  },

  findScoresBySiteId: async function(siteId) {
    return await Score.findScoresBySiteId(siteId);
  }

};

module.exports = scores;
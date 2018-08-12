const db = require('./db');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

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

const Score = {

  addScore: function(req, res) {
    const entryId = req.params.id;

    const sql = 'SELECT * FROM entries WHERE id = ? LIMIT 1';
    const query = db.query(sql, entryId, (err, result) => {
      if(err) throw err;
      console.log(result);
      const testUrl = result[0].url;

      const opts = {
        chromeFlags: ['--headless']
      };

      launchChromeAndRunLighthouse(testUrl, opts).then(results => {
        const score = {
          'entry_id': entryId,
          'speed_index': results.audits['speed-index'].rawValue
        };
        let sql = 'INSERT INTO scores SET ?';
        let query = db.query(sql, score, (err, result) => {
          if(err) throw err;
          res.json(result);
        });
      });
    });
  }

};

module.exports = Score;
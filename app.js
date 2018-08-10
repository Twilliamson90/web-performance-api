const express = require('express');
const config = require('./config');
const mysql = require('mysql');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const app = express();

const db = mysql.createConnection(config.development.database);

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('Mysql connected..')
});

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
}

app.get("/", (req, res) => {
  res.send("Hello from root");
});

app.get("/boards", (req, res) => {
  const testURL = 'https://travisw.me';

  // Usage:
  launchChromeAndRunLighthouse(testURL).then(results => {
    console.log(testURL);
    res.json(results.audits['speed-index'].rawValue);
  });
});

app.get("/boards/add", (req, res) => {
  let board = {name: 'Top Brands', path:'top-brands-gxy76'};
  let sql = 'INSERT INTO boards SET ?';
  let query = db.query(sql, board, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Added board');
  });
});

app.get("/scores/:boardId", (req, res) => {
  console.log(req.params.boardId);
  res.send(req.params.boardId)
});

app.listen(3001, () => {
  console.log("Server is up and listening on 3001...");
});
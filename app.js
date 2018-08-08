const express = require('express');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-db.json");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-pref-leaderboard.firebaseio.com"
});

const db = admin.database();
let ref = db.ref("/boards");

ref.on('value', gotData, errData);

function gotData(data) {
  console.log('Got data!');
  console.log(data.val());
}

function errData(err) {
  console.log('Error!');
  console.log(err);
}

console.log(ref);


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

  const opts = {
    chromeFlags: ['--headless'],
  };

  const testURL = 'https://travisw.me';

  // Usage:
  launchChromeAndRunLighthouse(testURL, opts).then(results => {
    console.log(testURL);
    console.log(results.audits['speed-index'].rawValue);
    res.json(results.audits['speed-index'].rawValue);
  });

});

app.listen(3001, () => {
  console.log("Server is up and listening on 3001...");
});
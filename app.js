const express = require('express');
// const lighthouse = require('./lighthouse.js');
const app = express();

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
}

app.get("/", (req, res) => {
  res.send("Hello from root");
});

app.get("/boards", (req, res) => {
  res.send('Jello');

  const opts = {
    chromeFlags: ['--show-paint-rects']
  };

  // Usage:
  launchChromeAndRunLighthouse('https://example.com', opts).then(results => {
    console.log(results);
  });

});

app.listen(3001, () => {
  console.log("Server is up and listening on 3001...");
});
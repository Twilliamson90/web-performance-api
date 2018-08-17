const express = require('express');
const bodyParser = require("body-parser");
const router = require('./router');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
  console.log("Server is up and listening on 3001...");
});
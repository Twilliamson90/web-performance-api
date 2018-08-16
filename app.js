let express = require('express');
let bodyParser = require("body-parser");
let router = require('./router');

let app = express();
let port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
  console.log("Server is up and listening on 3001...");
});
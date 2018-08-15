let express = require('express');
let bodyParser = require("body-parser");

let app = express();
let port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let boards = require('./controllers/boards');
let Entry = require('./controllers/Entry');
let Score = require('./controllers/Score');

// Routes
let router = express.Router();

router.use((req, res, next) => {
  // Middleware
  next();
});

router.get("/", (req, res) => {
  res.send("Hello from root");
});

router.route("/boards")
  .get((req, res) => {
    boards.getAllBoards().then(result => res.json(result) );
  })
  .post((req, res) => {
    boards.addBoard(req).then(result => res.json(result) );
  });

router.route("/boards/:id")
  .get((req, res) => {
    boards.getBoardById(req.params.id).then(result => res.json(result) );
  });

router.route("/boards/:id/entries")
  .get(Entry.getEntriesForBoard)
  .post(Entry.addEntry);

router.route("/entries/:id")
  .get(Entry.getEntryById)
  .post(Score.addScore);

// router.route("/entries/:id/scores")
//   .get(Entry.getScoresById)

app.use('/', router);

app.listen(port, () => {
  console.log("Server is up and listening on 3001...");
});
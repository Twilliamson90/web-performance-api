const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Board = require('./components/Board');
const Entry = require('./components/Entry');
const Score = require('./components/Score');

// Routes
const router = express.Router();

router.use((req, res, next) => {
  // Middleware
  next();
});

router.get("/", (req, res) => {
  res.send("Hello from root");
});

router.route("/boards")
  .get(Board.getAllBoards)
  .post((req, res) => {
    const newBoard = Board.addBoard(req);
    newBoard.then(function(x) {
      console.log(x);
    });
    res.send('hi');
  });

router.route("/boards/:id")
  .get(Board.getBoardById);

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
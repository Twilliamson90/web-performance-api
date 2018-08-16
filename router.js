let express = require('express');
let boards = require('./controllers/boards');
let sites = require('./controllers/sites');
let scores = require('./controllers/scores');

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
    boards.findAll().then(result => res.json(result));
  })
  .post((req, res) => {
    boards.create(req).then(result => res.json(result));
  });

router.route("/boards/:id")
  .get((req, res) => {
    boards.findById(req.params.id).then(result => res.json(result));
  });

router.route("/boards/:id/sites")
  .get((req, res) => {
    sites.findSitesByBoardId(req.params.id).then(result => res.json(result));
  })
  .post((req, res) => {
    sites.create(req).then(result => res.json(result));
  });

router.route("/sites/:id")
  .get((req, res) => {
    sites.findById(req.params.id).then(result => res.json(result))
  })
  .post((req, res) => {
    sites.create(req)
  });

router.route("/sites/:id/scores")
  .get((req, res) => {
    scores.findScoresBySiteId(req.params.id).then(result => res.json(result));
  });

module.exports = router;
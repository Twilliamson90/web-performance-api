const express = require('express');
const boards = require('./controllers/boards');
const sites = require('./controllers/sites');
const scores = require('./controllers/scores');

const router = express.Router();

router.use((req, res, next) => {
  // Middleware
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/", (req, res) => {
  res.send("Hello from root");
});

// GET http://localhost:3001/boards
// POST { boardName: 'Great board name' }
router.route("/boards")
  .get((req, res) => {
    boards.findAll().then(result => res.json(result));
  })
  .post((req, res) => {
    boards.create(req).then(result => res.json(result));
  });

// GET http://localhost:3001/boards/3
router.route("/boards/:id")
  .get((req, res) => {
    boards.findById(req.params.id).then(result => res.json(result));
  });

// GET http://localhost:3001/boards/slug/top-brands-gxy76
router.route("/boards/slug/:slug")
  .get((req, res) => {
    boards.findBySlug(req.params.slug).then(result => res.json(result));
  });

// GET http://localhost:3001/boards/3/sites
// POST :id { displayName: 'Awesome name', url: 'https://www.google.com' }
router.route("/boards/:id/sites")
  .get((req, res) => {
    sites.findSitesByBoardId(req.params.id).then(result => res.json(result));
  })
  .post((req, res) => {
    sites.create(req).then(result => res.json(result));
  });

// GET POST http://localhost:3001/sites/3
router.route("/sites/:id")
  .get((req, res) => {
    sites.findSitesByBoardId(req.params.id).then(result => res.json(result))
  })
  .post((req, res) => {
    sites.create(req).then(result => res.json(result));
  });

// GET http://localhost:3001/sites/3/scores
router.route("/sites/:id/scores")
  .get((req, res) => {
    scores.findScoresBySiteId(req.params.id).then(result => res.json(result));
  });

// GET http://localhost:3001/audit/3
router.route("/audit/:siteId")
  .get((req, res) => {
    scores.runAudit(req.params.siteId).then(result => res.json(result));
  });

module.exports = router;
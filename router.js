const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('./passport-config');
const { validateBody, schemas } = require('./helpers/route-validation');

const boards = require('./controllers/boards');
const sites = require('./controllers/sites');
const scores = require('./controllers/scores');
const users = require('./controllers/users');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// const router = express.Router();

router.use((req, res, next) => {
  // Middleware
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

router.get("/", (req, res) => {
  res.send("Hello from root");
});

// USER / AUTHENTICATION

router.route('/sign-up')
  .post(validateBody(schemas.authSchema), users.signUp);

router.route('/sign-in')
  .post(validateBody(schemas.authSchema), passportSignIn, users.signIn);

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), users.googleOAuth);

router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), users.facebookOAuth);

router.route('/secret')
  .get(passportJWT, users.secret);

// API

router.route('/user/:id')
  .get(passportJWT, users.findById);

// GET http://localhost:3001/boards
// POST { boardName: 'Great board name' }
router.route("/boards")
  .get((req, res) => {
    boards.findAll().then(result => res.json(result));
  })
  .post(passportJWT, (req, res) => {
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
  .post(passportJWT, (req, res) => {
    sites.create(req).then(result => res.json(result));
  });

// GET http://localhost:3001/sites/3
// POST :id {  }
router.route("/sites/:id")
  .get((req, res) => {
    sites.findSitesByBoardId(req.params.id).then(result => res.json(result))
  });

  // .post((req, res) => {
  //   sites.create(req).then(result => res.json(result));
  // });

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
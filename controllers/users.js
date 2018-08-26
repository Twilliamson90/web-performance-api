const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { jwt_secret } = require('../config');

signToken = user => {
  return JWT.sign({
    iss: 'WebPerf',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, jwt_secret);
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, display_name } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findByEmail(email);

    if (foundUser.length) {
      return res.status(403).json({ error: 'Email is already in use'});
    }

    const newUser = await User.create({ email, password, display_name });

    console.log(newUser);

    // Generate the token
    const token = signToken({id: newUser.insertId});
    // Respond with token
    res.status(200).json({ token, user: newUser });
  },

  signIn: async (req, res, next) => {
    console.log('User controller signIn');
    console.log(req.user);
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token, user: req.user });
  },

  checkAuth: async(req, res, next) => {
    res.json({'ok': 'checkAuth'});
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  },

  findById: async function(req, res, next) {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  }

};
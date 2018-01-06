const Promise    = require('bluebird');
const { secret } = require('../config/environment');
const User       = require('../models/user');
const jwt        = Promise.promisifyAll(require('jsonwebtoken'));

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.unauthorized();

  const token = req.headers.authorization.replace('Bearer ', '');

  jwt.verifyAsync(token, secret)
    .then((payload) => {
      return User.findById(payload.id).populate('language');
    })
    .then((user) => {
      if(!user) return res.unauthorized();
      req.currentUser = user;
      return next();
    })
    .catch(next);
}

module.exports = secureRoute;
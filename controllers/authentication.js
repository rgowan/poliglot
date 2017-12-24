const jwt        = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User       = require('../models/user');

function register(req, res, next) {
  User
    .create(req.body)
    .then(user => {
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1hr' });
      
      return res.json({ message: `Welcome`, token, user });
    })
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' });

      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1hr' });
      return res.json({ message: `Welcome back`, token, user });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};

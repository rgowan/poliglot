const jwt        = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User       = require('../models/user');

const sockets    = require('../lib/sockets');
const io         = sockets.getConnection();

function register(req, res, next) {
  req.body.online = false;

  User
    .create(req.body)
    .then(user => {
      user.online = true;
      return user.save()
    })
    .then(user => {
      io.emit('login', user);
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '24hrs' });
      return res.json({ message: `Welcome`, token, user });
    })
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' });

      user.online = true;
      return user.save();
    })
    .then(user => {
      io.emit('login', user);
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '24hrs' });
      return res.json({ message: `Welcome back`, token, user });
    })
    .catch(next);
}

function logout(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      user.online = false;
      return user.save();
    })
    .then(user => {
      io.emit('logout', user); 
      return res.status(204).end();
    })
    .catch(next);
}

module.exports = {
  register,
  login,
  logout
};

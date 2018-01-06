const User = require('../models/user');

function index(req,res,next) {
  User
    .find()
    .populate('language')
    .then(users => res.status(200).json(users))
    .catch(next);
}

function show(req,res,next) {
  User
    .findById(req.params.id)
    .populate('language')
    .then(user => res.status(200).json(user))
    .catch(next);
}

module.exports = {
  index,
  show
}
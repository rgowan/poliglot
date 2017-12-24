const User = require('../models/user');

function index(req,res,next) {
  User
    .find()
    .then(users => res.status(200).json(users))
    .catch(next);
}

function show(req,res,next) {
  User
    .findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(next);
}

module.exports = {
  index,
  show
}
const User = require('../models/user');

function index(req,res,next) {
  User
    .find()
    .exec()
    .then(users => res.status(200).json(users));
}

module.exports = {
  index
}
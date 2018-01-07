const User = require('../models/user');

async function index(req, res, next) {
  const users = await User.find().populate('language');
  res.status(200).json(users);
}

async function show(req,res,next) {
  const user = await User.find(req.params.id).populate('language')
  res.status(200).json(user);
}

module.exports = {
  index,
  show
}
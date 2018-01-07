const Language = require('../models/language');

async function index(req, res, next) {
  const languages = await Language.find();
  res.status(200).json(languages);
}

module.exports = {
  index
}
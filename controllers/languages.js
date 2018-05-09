const Language = require('../models/language');

function index(req, res, next) {
  Language
    .find()
    .then(languages => res.status(200).json(languages))
    .catch(next);
}

module.exports = {
  index
};

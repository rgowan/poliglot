const Language = require('../models/language');

function index(req, res, next) {
  Language
    .find({ $query: {}, $orderby: { name : 1 } })
    .then(languages => res.status(200).json(languages))
    .catch(next);
}

module.exports = {
  index
}
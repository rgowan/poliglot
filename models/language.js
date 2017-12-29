const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  icon: { type: String }
});

module.exports = mongoose.model('Language', languageSchema);
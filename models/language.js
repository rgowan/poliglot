const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  emoji: { type: String }
});

module.exports = mongoose.model('Language', languageSchema);
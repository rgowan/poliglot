const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  messages: [{}],
  archive: { type: Array, default: [] }
}, {
  timestamps: true
});

chatSchema
  .path('participants')
  .validate(participants => {
    if (participants.length < 2) return false;
    return true;
  }, 'A chat must have two participants');

module.exports = mongoose.model('Chat', chatSchema);
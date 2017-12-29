const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  messages: [messageSchema],
  language: { type: String }
}, {
  timestamps: true
});

chatSchema.path('participants').validate(participants => {
  if (participants.length < 2) return false;
  return true;
}, 'A chat must have two participants');

module.exports = mongoose.model('Chat', chatSchema);
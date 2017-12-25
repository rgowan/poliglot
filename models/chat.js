const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.ObjectId, ref: 'User',
    required: true,
    validate: [mustHaveTwoParticipants, 'A chat must contain two participants.']
  }],
  messages: [messageSchema]
}, {
  timestamps: true
});

function mustHaveTwoParticipants() {
  return this.participants.length === 2;
}
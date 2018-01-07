const Chat      = require('../models/chat');
const translate = require('google-translate-api');
const sockets   = require('../lib/sockets');
const io        = sockets.getConnection();

function create(req, res, next) {
  req.body.createdBy = req.currentUser;

  Chat
    .findById(req.params.id)
    .populate([
      {
        path: 'participants',
        populate: { path: 'language' }
      }, {
        path: 'messages.createdBy',
        populate: { path: 'language' }
      }
    ])
    .then(chat => {
      // timestamps?

      // find language of the participant that is not the currentUser
      // save a property of the message to be the current users language as the key and the req.body.content as the value
      // save a property of the message to the participant's language with the translated version of req.body.content
      // save createdBy to be the currentUser
      // set createdAt to be new Date()

      // push new message object into array of messages for the chat and then save the chat.

      // BOOOOOOM


      // chat.messages.push(req.body);
      // return chat.save();
    })
    .then(chat => {
      const message = chat.messages[chat.messages.length -1];
      io.emit('newMessage', message);
      return res.status(201).json(message);
    })
    .catch(next);
}

function remove(req, res, next) {
  Chat
    .findById(req.params.chatId)
    .exec()
    .then(chat => {
      const message = chat.messages.id(req.params.messageId);

      if (req.currentUser.id == message.createdBy) {
        message.remove();
        return chat.save();
      }
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function convert(req, res, next) {
  const phrase = decodeURIComponent(req.params.phrase);

  translate(phrase, {from: 'en', to: req.params.to})
    .then(data => res.status(200).json(data.text))
    .catch(err => console.log(err));
}

module.exports = {
  create,
  remove,
  convert
}
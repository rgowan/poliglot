const Chat      = require('../models/chat');
const translate = require('google-translate-api');
const sockets   = require('../lib/sockets');
const io        = sockets.getConnection();

function create(req, res, next) {
  req.body.createdBy = req.currentUser;

  Chat
    .findById(req.params.id)
    .then(chat => {
      chat.messages.push(req.body);
      return chat.save();
    })
    .then(chat => {
      const message = chat.messages[chat.messages.length -1];
      io.emit('newMessage', message);
      return res.status(201).end();
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

function convert(res,res,next) {
  const phrase = decodeURI(req.params.phrase);

  translate(phrase, {from: req.params.from, to: req.params.to})
    .then(data => res.status(200).json(data.text))
    .catch(err => console.log(err));
}

module.exports = {
  create,
  remove,
  convert
}
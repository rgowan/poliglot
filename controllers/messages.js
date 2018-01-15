const Chat             = require('../models/chat');
const translateMessage = require('../lib/translate');
const sockets          = require('../lib/sockets');
const io               = sockets.getConnection();

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
      const languageForTranslation = chat.participants.find(user => user.fullname !== req.currentUser.fullname).language.code;

      translateMessage(req.body.content, req.currentUser.language.code, languageForTranslation)
        .then(data => {
          const newMessage = {};
          
          newMessage[req.currentUser.language.code] = req.body.content;
          newMessage[languageForTranslation] = data;
          newMessage.createdBy = req.currentUser;
          newMessage.createdAt = new Date();

          chat.messages.push(newMessage);
          return chat.save();
        })
        .then(chat => {
          const message = chat.messages[chat.messages.length -1];

          io.emit('newMessage', message);
          return res.status(201).json(message);
        });
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

module.exports = {
  create,
  remove
}
const Chat = require('../models/chat');
const translateMessage = require('../lib/translate');
const sockets = require('../lib/sockets');
const io = sockets.getConnection();
const notifier = require('node-notifier');
const path = require('path');


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
      if(chat.archive.length !== 0) {
        chat.archive = [];
      }

      const languageForTranslation = chat.participants.find(user => user.fullname !== req.currentUser.fullname).language.code;

      translateMessage(req.body.content, req.currentUser.language.code, languageForTranslation)
        .then(data => {
          const newMessage = {};

          newMessage[req.currentUser.language.code] = req.body.content;
          newMessage[languageForTranslation] = data;
          newMessage.createdBy = req.currentUser;
          newMessage.createdAt = new Date();
          newMessage.read = [req.currentUser.id];

          chat.messages.push(newMessage);
          return chat.save();
        })
        .then(chat => {
          const message = chat.messages[chat.messages.length -1];

          notifier.notify({
            'title': `${message.createdBy.first} ${message.createdBy.last}`,
            'subtitle': 'New Message',
            'message': `${message[req.currentUser.language.code]}`,
            'icon': path.join(__dirname, '../src/assets/images/logo.png')
          });

          io.emit('newMessage', message);
          io.emit('updatedChat', chat);
          return res.status(201).json(message);
        });
    })
    .catch(next);
}

module.exports = {
  create
};

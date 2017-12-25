const Chat = require('../models/chat');

function create(req, res, next) {
  req.body.createdBy = req.currentUser;

  Chat
    .findById(req.params.id)
    .then(chat => {
      if (!chat) return res.notFound();
      chat.messages.push(req.body);
      return chat.save();
    })
    .then(chat => {
      const message = chat.messages[chat.messages.length -1];
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

      return res.unauthorized(); 
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create,
  remove
}
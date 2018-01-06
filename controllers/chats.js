const Chat             = require('../models/chat');
const translateMessage = require('../lib/translate');

function find(req, res, next) {
  Chat
    .find({ participants: req.currentUser.id })
    .populate([
      {
        path: 'participants',
        populate: { path: 'language' }
      }, {
        path: 'messages.createdBy',
        populate: { path: 'language' }
      }
    ])
    .then(chats => res.status(200).json(chats))
    .catch(next);
}

function show(req, res, next) {
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
      chat.messages = chat.messages.map(message => {
        if (message.createdBy.id == req.currentUser._id) {
          return message;
        } else {
          translateMessage(message.content, message.createdBy.language.code, req.currentUser.language.code)
            .then(translatedMessage => {
              console.log(translatedMessage);
            });
        }

        return message;
      })

      res.status(200).json(chat);
    })
    .catch(next);
}

function create(req, res, next) {
  req.body.participants = [req.currentUser.id, req.params.id];

  Chat
    .create(req.body)
    .then(chat => res.status(201).json(chat))
    .catch(next);
}

function put(req, res, next) {
  Chat
    .findByIdAndUpdate(req.params.id, { $set: { language: req.body.language } }, { new: true })
    .then(chat => res.status(200).json(chat))
    .catch(next);
}

function remove(req, res, next) {
  Chat
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  find,
  show,
  create,
  put,
  remove
}
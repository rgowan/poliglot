const Promise = require('bluebird');

const Chat = require('../models/chat');
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
      chat.messages.forEach((message) => {
        if(!message.read.includes(req.currentUser.id)) {
          message.read.push(req.currentUser.id);
        }
      });

      chat.markModified('messages');
      return chat.save();
    })
    .then(chat => {
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

function archive(req, res, next) {
  Chat
    .findById(req.params.id)
    .then(chat => {
      if(!chat.archive.includes(req.currentUser.id)) {
        chat.archive.push(req.currentUser.id);
      }

      return chat.save();
    })
    .then(chat => res.json(chat))
    .catch(err => console.log(err));
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
  archive,
  remove
}
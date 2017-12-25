const router      = require('express').Router();

const auth        = require('../controllers/authentication');
const users       = require('../controllers/users');
const chats       = require('../controllers/chats');
const messages    = require('../controllers/messages');
const secureRoute = require('../lib/secureRoute');

router.route('/register')
  .post(auth.register);
router.route('/login')
  .post(auth.login);

router.route('/users')
  .get(secureRoute, users.index);
router.route('/users/:id')
  .get(secureRoute, users.show);

router.route('/chats')
  .get(chats.find);
router.route('/chats/:id')
  .get(chats.show)
  .delete(chats.remove);
router.route('/chats/create/:id')
  .post(chats.create);

router.route('/chats/:id/messages')
  .post(messages.create);
router.route('/chats/:chatId/messages/messageId')
  .delete(messages.remove);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
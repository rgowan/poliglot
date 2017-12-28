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
  .get(users.index);
router.route('/users/:id')
  .get(secureRoute, users.show);

router.route('/chats')
  .get(secureRoute, chats.find);
router.route('/chats/:id')
  .get(secureRoute, chats.show)
  .delete(secureRoute, chats.remove);
router.route('/chats/create/:id')
  .post(secureRoute, chats.create);

router.route('/chats/:id/messages')
  .post(secureRoute, messages.create);
router.route('/chats/:chatId/messages/:messageId')
  .delete(secureRoute, messages.remove);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
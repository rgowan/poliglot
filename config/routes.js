const router = require('express').Router();

const auth   = require('../controllers/authentication');
const users  = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router.route('/register')
  .post(auth.register);
  
router.route('/login')
  .post(auth.login);

router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id')
  .get(secureRoute, users.show);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
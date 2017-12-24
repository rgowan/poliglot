const router = require('express').Router();

const auth   = require('../controllers/authentication');
const users  = require('../controllers/users');

router.route('/register')
  .post(auth.register);
  
router.route('/login')
  .post(auth.login);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
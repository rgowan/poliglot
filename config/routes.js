const router = require('express').Router();

router.all('/*', (req, res) => res.notFound());

module.exports = router;
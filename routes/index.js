const express = require('express'),
  router = express.Router(),
  authPages = require('./auth');
homePages = require('./home');

router.get('/', function () {});
router.use('/', authPages);
router.use('/', homePages);

module.exports = router;

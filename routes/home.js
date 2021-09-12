const express = require('express'),
  router = express.Router(),
  homeController = require('../controllers/homeController');

router.get('/home', homeController.goHome);

router.post('/home', (req, res) => {
  console.log(req.body);
  console.log(req.query);
  let name = req.body.name;
  req.session.name = name;
  res.send('POST Successful!');
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Simulacro Jesus 2' });
});

module.exports = router;

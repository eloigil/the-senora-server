const express = require('express');
const router = express.Router();

const response = require('../helpers/response');

/* GET home page. */
router.get('/', function (req, res, next) {
  response.data(req, res, { welcome: 'the Señora' });
});

module.exports = router;

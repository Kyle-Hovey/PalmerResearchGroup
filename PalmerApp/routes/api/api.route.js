var express = require('express');
var router = express.Router();
var risk = require('./risk.route')

router.use('/risk', risk);

module.exports = router;

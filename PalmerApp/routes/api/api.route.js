var express = require('express');
var router = express.Router();
var risk = require('./api/todos.route')

router.use('/risk', risk);

module.exports = router;

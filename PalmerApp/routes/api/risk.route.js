var express = require('express');
var router = express.Router();
var RiskController = require('../../controllers/risk.controller');

router.get('/', RiskController.getRisk)

module.exports = router;

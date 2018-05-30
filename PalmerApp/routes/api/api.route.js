var express = require('express');
var router = express.Router();
var cors = require('cors');
var RiskController = require('../../controllers/risk.controller');

router.use('/:latitude-:longitude', cors(), RiskController.getRiskFromLocation);

module.exports = router;

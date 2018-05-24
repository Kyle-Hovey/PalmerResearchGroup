var express = require('express');
var router = express.Router();
var RiskController = require('../../controllers/risk.controller');

router.use('/risk', RiskController.getRisk);

router.use('/:latitude-:longitude', RiskController.getRiskFromLocation);

module.exports = router;

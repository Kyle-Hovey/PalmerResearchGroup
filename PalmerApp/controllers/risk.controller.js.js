//Access the service

var RiskService = require('../services/risk.service')

//Save in _this

_this = this

//Get the risks

exports.getRisk = async function(req, res, next)
{
	var page = req.query.page ? req.query.page : 1
	var limit = req.query.limit ? req.query.limit : 10;
	
	try{
		var risk = await RiskService.getRisk({}, page, limit)
		
		return res.status(200).json({status: 200, data: todos, message: "Got the risk!"})
	}catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
}
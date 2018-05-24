//Getting Risk Model

var Risk = require('../models/risk.model')

//Save in _this

_this = this

//Get the risks

exports.getRisk = async function(req, res, next)
{
	try{
		var risk = await Risk.findOne({'risk' : {$gt : .5}})
		
		return res.status(200).json({status: 200, data: risk, message: "Got the risk!"})
	}catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
}
//Getting Risk Model

var Risk = require('../models/risk.model')

//Save in _this

_this = this

//Get the risks

exports.getRisk = async function(req, res, next)
{
	try{
		var risk = await Risk.findOne({'risk' : {$gt : .7}});
		
		return res.json(risk);
	}catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
}

exports.getRiskFromLocation = async function(req, res, next) 
{
	try{
		var risk = await Risk.findOne({'latitude' : req.params.latitude, 'longitude' : req.params.longitude});

		return res.json(risk);
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
}
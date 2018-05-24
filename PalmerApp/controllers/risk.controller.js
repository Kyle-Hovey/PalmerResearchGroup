//Getting Risk Model

var Risk = require('../models/risk.model')

//Save in _this

_this = this

//Get the risks

exports.getRisk = async function(req, res, next)
{
	try{
<<<<<<< HEAD
		var risk = await Risk.findOne({'risk' : {$gt : .2}})
		
		return res.status(200).json({status: 200, data: risk.risk, message: "Got the risk!"})
=======
		var risk = await Risk.findOne({'risk' : {$gt : .5}});
		
		return res.status(200).json({status: 200, data: risk, message: "Got the risk!"});
>>>>>>> 6291f75c07b3f963aa504515f9339858a1b6ad42
	}catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
}

exports.getRiskFromLocation = async function(req, res, next) 
{
	try{
		var risk = await Risk.findOne({'latitude' : req.params.latitude, 'longitude' : req.params.longitude});

		return res.status(200).json({status: 200, data: risk, message: "Got the risk from latitude: " + req.params.latitude + " and longitude: " + req.params.longitude});
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
}
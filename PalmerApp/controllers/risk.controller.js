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
		var tempLat = (parseFloat(req.params.latitude) - 44.57338516) / -0.00061283;
		var tempLong = (parseFloat(req.params.longitude) + 97.59552151) / 0.000838633;
		tempLat = Math.round(tempLat / 10) * 10;
		tempLong = Math.round(tempLong / 10) * 10;
		console.log(tempLat);
		console.log(tempLong);
		tempLat = 44.57338516 + (tempLat * -0.00061283)
		tempLong = -97.59552151 + (tempLong * 0.000838633)
		var finalLat = tempLat.toString();
		var finalLong = tempLong.toString();
		console.log(tempLat);
		console.log(tempLong);
		var risk = await Risk.findOne({'latitude' : finalLat, 'longitude' : finalLong});

		return res.json(risk);
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
}
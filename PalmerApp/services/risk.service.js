//Getting Risk Model

var Risk = require('../models/risk.model')

//Save the context of module insidethe _this variable

_this = this

exports.getRisk = async function(query, page, limit){

	var options = {
		page,
		limit
	}

	//Try Catch the awaited promise to handle the error

	try {
		var risk = await Risk.paginate(query, options)

		//return the risk list that was returned by the mongoose promise

		return risk;
	} catch (e) {

		//return a Error message describing reson

		throw Error('Error while Paginating Risk')
	}
}
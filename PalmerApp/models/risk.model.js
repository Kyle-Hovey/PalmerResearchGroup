var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var RiskSchema = new mongoose.Schema({
	risk : Number,
	latitude : Number,
	longitude : Number
},
{
	collection : 'risk'
})

RiskSchema.plugin(mongoosePaginate)
const Risk = mongoose.model('Risk', RiskSchema)

module.exports = Risk;
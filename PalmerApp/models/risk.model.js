var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

//mongoimport -d palmer -c risk --type csv --file palmerNew.csv --headerline
var RiskSchema = new mongoose.Schema({
	risk : Number,
	latitude : Number,
	longitude : Number,
	x: Number,
	y: Number
},
{
	collection : 'risk'
})

RiskSchema.plugin(mongoosePaginate)
const Risk = mongoose.model('Risk', RiskSchema)

module.exports = Risk;
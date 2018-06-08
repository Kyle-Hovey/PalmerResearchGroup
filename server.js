var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var mongodb = require("mongodb");
var http = require("http");
var ObjectID = mongodb.ObjectID;

var RISK_COLLECTION = "risk";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/PalmerClient";
app.use(express.static(distDir));

var db;

//mongoose local connection
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/palmer", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/api/:lat-:lng", async function(req, res, next) 
{
	try{
		var tempLat = (parseFloat(req.params.lat) - 44.57338516) / -0.00061283;
		var tempLong = (parseFloat(req.params.lng) + 97.59552151) / 0.000838633;
		tempLat = Math.round(tempLat / 10) * 10;
		tempLong = Math.round(tempLong / 10) * 10;
		console.log(tempLat);
		console.log(tempLong);
		var risk = await db.collection(RISK_COLLECTION).findOne({'xCoord' : tempLat, 'yCoord' : tempLong});
		
		if (risk == null)
		{
			console.log("TRYING AGAIN");
			var tempLat = (parseFloat(req.params.lat) - 44.57338516) / -0.00061283;
			var tempLong = (parseFloat(req.params.lng) + 97.59552151) / 0.000838633;
			tempLat = Math.round(tempLat / 20) * 20;
			tempLong = Math.round(tempLong / 20) * 20;
			console.log(tempLat);
			console.log(tempLong);
			var risk = await db.collection(RISK_COLLECTION).findOne({'xCoord' : tempLat, 'yCoord' : tempLong});
		}
		return res.json(risk);
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/PalmerClient/index.html'));
});
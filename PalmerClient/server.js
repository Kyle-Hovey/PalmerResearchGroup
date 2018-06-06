var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ObjectID = mongodb.ObjectID;

var RISK_COLLECTION = "risk";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mogoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/palmer", function (err, client) {
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


//Risk API routes below

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/:lat-:lng"
 *  Get finds risk at specific lat lng
 */

app.get("api/:lat-:lng", async function(req, res, next) 
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
    console.log(finalLat);
    console.log(finalLong);
    var risk = await Risk.findOne({'latitude' : finalLat, 'longitude' : finalLong});

    return res.json(risk);
  } catch(e){
      return res.status(400).json({status: 400, message: e.message});
  }
});
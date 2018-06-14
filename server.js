var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var mongodb = require("mongodb");
var http = require("http");
var ObjectID = mongodb.ObjectID;
var nodeMailer = require('nodemailer');

var multer = require('multer');

var BLOG_COLLECTION = "posts";

var RISK_COLLECTION = "risk";

var app = express();
app.set('view engine', 'js');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var distDir = __dirname + "/dist/PalmerClient";
app.use(express.static(distDir));

app.use(express.static('uploads'));

var uploadDir = './uploads/';
var storage = multer.diskStorage({
	destination: uploadDir,
	filename: function(req, file, cb){
		cb(null, file.originalname)
	}
});
var upload = multer({storage: storage}).single('photo');


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

app.post('/api/sendmail', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'simpsonpalmerproject@gmail.com',
              pass: 'Palmer99'
          }
      });
      let mailOptions = {
          from: 'simpsonpalmerproject@gmail.com', // sender address
          to: 'simpsonpalmerproject@gmail.com', // list of receivers
          subject: 'Palmer Project: New Contact Message', // Subject line
          text: 'NAME: ' + req.body.name + '\n\nPHONE NUMBER: ' + req.body.phone + '\n\nEMAIL: ' + req.body.email + '\n\nMESSAGE: ' + req.body.message // plain text body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
      });

app.post('/api/upload', function(req, res, next) {
	var path = '';
	upload(req, res, function(err) {
		if (err) {
			console.log(err);
			return res.status(422).send("a file upload error occured");
		}

		path = req.file.path;
		return res.send("Upload complete for " + path);
	});
});

app.post('/api/blogpost', function(req, res, next) {
	var newPost = req.body;
	db.collection(BLOG_COLLECTION).insertOne(newPost, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to create new contact.");
		} else {
			res.status(201).json(doc.ops[0]);
		}
	});
});

app.get('/api/blog/:num', function(req, res, next) {
	db.collection(BLOG_COLLECTION).find({}).toArray(function(error, documents) {
		if (error) throw error;

		res.send(documents);
	});
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/PalmerClient/index.html'));
});
//Required for Express App
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

//Required for DB Connection
var mongodb = require("mongodb");
var ObjectId = mongodb.ObjectId;

// Required for contact form
var nodeMailer = require('nodemailer');

// Required for Login
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var ExpressJwt = require ('express-jwt');
var auth = ExpressJwt({
	secret: 'meansecure',
	userProperty: 'payload'
});

//Required for File Upload
var multer = require('multer');
var fs = require('fs');

//DB Collection Identities
var BLOG_COLLECTION = "posts";

var RISK_COLLECTION = "risk";

var USER_COLLECTION = "users";

//Initialize express api
var app = express();
app.set('view engine', 'js');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Store static Angular app
var distDir = __dirname + "/dist/PalmerClient";
app.use(express.static(distDir));

//Route to static file directory
app.use(express.static('public'));

//Variables needed for File Uploads
var uploadDir = './public/uploads/';
var storage = multer.diskStorage({
	destination: uploadDir,
	filename: function(req, file, cb){
		cb(null, file.originalname)
	}
});
var upload = multer({storage: storage}).single('photo');

//Var to store database connection
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

// Validation Functions
var validPassword = function (password, salt, hash) {
	var checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return hash === checkHash;
};

var generateJwt =function(user) {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: user._id,
		username: user.username,
		exp: parseInt(expiry.getTime() / 1000), 
	}, 'meansecure');
};

passport.use(new LocalStrategy(
	function(username, password, done) {
		db.collection(USER_COLLECTION).findOne({username: username}, function(err, user) {
			if (err) { return done(err); }

			if (!user) {
				return done(null, false, {
					message: 'user not found'
				});
			}

			if (!validPassword(password, user.salt, user.hash)) {
				return(null, false, {
					message: 'password is wrong'
				});
			}

			return done(null, user);
		});
	}
));

app.use(passport.initialize());

//Get Risk data for specific latitude and longitude
app.get("/api/:lat-:lng", async function(req, res, next) 
{
	try{
		var tempLat = (parseFloat(req.params.lat) - 44.57338516) / -0.00061283;
		var tempLong = (parseFloat(req.params.lng) + 97.59552151) / 0.000838633;
		tempLat = Math.round(tempLat / 10) * 10;
		tempLong = Math.round(tempLong / 10) * 10;
		var risk = await db.collection(RISK_COLLECTION).findOne({'xCoord' : tempLat, 'yCoord' : tempLong});
		
		if (risk == null)
		{
			var tempLat = (parseFloat(req.params.lat) - 44.57338516) / -0.00061283;
			var tempLong = (parseFloat(req.params.lng) + 97.59552151) / 0.000838633;
			tempLat = Math.round(tempLat / 20) * 20;
			tempLong = Math.round(tempLong / 20) * 20;
			var risk = await db.collection(RISK_COLLECTION).findOne({'xCoord' : tempLat, 'yCoord' : tempLong});
		}
		return res.json(risk);
	} catch(e){
		return res.status(400).json({status: 400, message: e.message});
	}
});

//Send email to our address from the contact us form
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

//Upload a photo from the blog post page
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

app.post('/api/delete/:path/:id', function(req, res, next) {
	var id = ObjectId(req.params.id);
	fs.unlink("./public/uploads/" + req.params.path, function() {
		db.collection(BLOG_COLLECTION).update({_id: id}, {$unset: {photo: ""}}, function(err, doc){
			if (err){
				handleError(res, err.message, "Failed to delete file path.");
			} else {
				res.status(201).json(doc);
			}
		});
	});
});

//Create a new post and add it to the database
app.post('/api/blogpost', function(req, res, next) {
	var newPost = req.body;
	db.collection(BLOG_COLLECTION).insertOne(newPost, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to create new post.");
		} else {
			res.status(201).json(doc.ops[0]);
		}
	});
});

app.post('/api/editpost', function(req, res, next) {
	var editedPost = req.body;
	var id = ObjectId(editedPost._id);
	db.collection(BLOG_COLLECTION).update({_id: id}, {$set: {title: editedPost.title, author: editedPost.author, text: editedPost.text, photo: editedPost.photo, editedDate: editedPost.editedDate }}, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to update post.");
		} else {
			res.status(201).json(doc);
		}
	})
})

app.delete('/api/deletePost/:id', function(req, res, next) {
	var id = ObjectId(req.params.id);
	db.collection(BLOG_COLLECTION).deleteOne({_id: id}, function(err) {
		if (err) {
			handleError(res, err.message, "Failed to delete post.");
		} else {
			res.status(201).send('Post Deleted');
		}
	});
})

//Get an increment of 5 blogposts ex: /api/blog/5 gets blog post 6-10, ordered new to old
app.get('/api/blog/:num', function(req, res, next) {
	db.collection(BLOG_COLLECTION).find({}).sort({_id:-1}).skip(parseInt(req.params.num)).limit(5).toArray(function(error, documents) {
		if (error) throw error;
		documents.forEach(function(document) {
			document.text = document.text.replace(/\n/g, "<br />");
		})
		res.send(documents);
	});
});

app.get('/api/newestpost', function(req, res, next) {
	db.collection(BLOG_COLLECTION).find({}).sort({_id:-1}).skip(parseInt(req.params.num)).limit(1).toArray(function(error, documents) {
		if (error) throw error;
		documents.forEach(function(document) {
			document.text = document.text.replace(/\n/g, "<br />");
		})
		res.send(documents[0]);
	});
})

//Get a single blog post by the post id number
app.get('/api/post/:id', async function(req,res,next) {
	var id = new ObjectId(req.params.id);
	await db.collection(BLOG_COLLECTION).findOne({_id: id}, function(error, document) {
		if (error) throw error;
		document.text = document.text.replace(/\n/g, "<br />");
		return res.json(document);
	});
});

app.get('/api/edit/:id', async function(req, res, next) {
	var id = new ObjectId(req.params.id);
	await db.collection(BLOG_COLLECTION).findOne({_id: id}, function(error, document) {
		if (error) throw error;
		return res.json(document);
	});
})

//Login to the app, returns a jwt token
app.post('/api/login', function(req, res) {
	console.log('Finding User');
	passport.authenticate('local', function(err, user, info) {
		var token;

		console.log(user);

		if (err) {
			res.status(404).json(err);
			return
		}

		if (user) {
			console.log('user found, creating token');
			token = generateJwt(user);
			console.log('token: ' + token);
			res.status(200);
			res.json({
				"token" : token
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res);
});

app.get('/api/create', auth, async function(req, res, next) {
	console.log(req.payload);
	if (!req.payload || !req.payload._id) {
		res.status(401).json({
			"message" : "UnauthorizedError: private"
		});
	} else {
		console.log('finding user');
		var id = new ObjectId(req.payload._id);
		var user = await db.collection(USER_COLLECTION).findOne({_id : id});
		console.log(user);
		res.status(200).json(user);
	}
});

// Return the index page if unrecognized route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/PalmerClient/index.html'));
});

//authorization error handler
app.use(function (err, req, res, next) {
  console.log('UnauthorizedError logging');
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err);
  } else next(err);
});

//General error handler
app.use(function(err, res, res, next) {
  console.log("ERROR: " + err);
  res.status(500).json({"error": err.message});
});

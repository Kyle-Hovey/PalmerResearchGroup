var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Palmer World' });
});

router.post('/', function (req, res) {
    console.log(req.body.latitude);
    console.log(req.body.longitude);
    res.redirect('/api/'+req.body.latitude+'-'+req.body.longitude);
});

module.exports = router;

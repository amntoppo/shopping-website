var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csurf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');

var csurfProtection = csurf();
router.use(csurfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var product = Product.find(function(err, doc) {
    var ChunkArray = [];
    var ChunkSize = 3;
    for (var i=0; i < doc.length ; i += ChunkSize) {
      ChunkArray.push(doc.slice(i, i + ChunkSize));
    }
    res.render('index', { title: 'Shopping Website', products: ChunkArray });
  });

});

router.get('/user/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csurfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
  console.log('profile');
  res.render('user/profile');
});

module.exports = router;

var csurf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');
var express = require('express');
var router = express.Router();

var csurfProtection = csurf();
router.use(csurfProtection);

router.get('/profile', isLoggedIn,  function(req, res, next) {
    // console.log('profile');
    res.render('user/profile');
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/', notLoggedIn, function (req, res, next) {
    next();
});


router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csurfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csurfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
       return next();
    }
    res.redirect('/');
}
function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}



module.exports = router;

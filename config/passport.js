var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new localStrategy({
  usernameField: 'email',
  passportField:'password',
  passReqToCallback: true
},
  function(req, email, password, done) {
    User.findOne({'email' : email}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, {message: 'Email is already in use'});
      }
      var newUser = new User() ;
      newUser.email = email;
      // console.log('ep');
      newUser.password = newUser.encryptPassword(password);
      newUser.save(function(err, result) {
        if (err) {
          // console.log('error');
          return done(err);
        }
        else {
          // console.log('no error');
          return done(null, newUser);
        }
      });
    });
  }));

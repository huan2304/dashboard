const { Template } = require('ejs');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const { default: mongoose } = require('mongoose');

const schema_account = require('./../schemas/schema_account');
const model_account = new mongoose.model("model_account", schema_account, "account");

var router = express.Router();


router.get('/login', function(req, res, next) {
  console.log(__dirname);
    res.render('pages/login', {layout: 'layouts/blank'});
});

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    let user = await model_account.find({username: username});
    if (user.length == 0) return cb(null, false);
    else return cb(null, user[0]);
}));

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
});



module.exports = router;
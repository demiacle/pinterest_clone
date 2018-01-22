var passport = require('passport')
var TwitterStrategy = require('passport-twitter')
var mongoose = require('mongoose')
var userModel = require('./models.js').userModel

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: process.env.BACKEND_URL + "twitterCallback"
},
  function (token, tokenSecret, profile, cb) {
    userModel.findOneOrCreate({ twitterId: profile.id, userName: profile.username }, function (err, user) {
      if( user.profileUrl === profile._json.profile_image_url ){
        return cb(err,user)
      } else {
        user.profileUrl = profile._json.profile_image_url
        user.save((err, updatedUser)=>{
          return cb(err, updatedUser)
        })
      }
    });
  }
));

function test(){
    userModel.findOneOrCreate({ twitterId: 't' }, function (err, user) {
      console.log('user');
    });
}

module.exports = test;
var passport = require('passport');
var mongoose = require('mongoose');

var GitHubStrategy = require('passport-github').Strategy;

module.exports = function() {
  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID: '6d1442e66a6e7cfe8d16',
    clientSecret: 'a175a66870de67372f7daaf883b43e6ba0928e9c',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done){
    Usuario.findOrCreate(
      { 'login' : profile.username},
      { 'nome' : profile.username},
      function(erro, usuario) {
        if(erro) {
          console.log(erro);
          return done(erro);
        }
        return done(null, usuario);
      }
    );
  }));

  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id).exec()
    .then(function(usuario) {
        done(null, usuario);
    });
  });

}

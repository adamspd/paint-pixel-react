const User = require('./data/users')
const LocalStrategy = require('passport-local')
const  bcrypt  =  require( "bcryptjs" ) ;

const passportLogin = (passport) =>{

    
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            }
            else{
                return done(null, false);

            }
        });

        
      });
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

module.exports = passportLogin
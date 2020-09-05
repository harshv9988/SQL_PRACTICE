const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('../config/mySQL');

//authentication using passport
passport.use(
   'local',
   new LocalStrategy({
   usernameField: 'user_id',
   },
    function(user_id, password, done){
        //find the user and establish the identity
      mysql.query('SELECT * FROM user_id WHERE user_id = ?', [user_id],
      function(err, rows){
         if(err) return done(err);

         if(!rows.length){
            console.log("NO USER FOUND....");
            return done(null, false);
         }

         if(password != rows[0].password){
            console.log("WRONG PASSWORD....");
            return done(null, false);
         }

         return done(null, rows[0]);
      })
    }
));


passport.serializeUser(function(user, done){
   done(null, user.user_id);
 });
   
 passport.deserializeUser(function(user_id, done){
    mysql.query("SELECT * FROM user_id WHERE user_id = ? ", user_id,
      function(err, rows){

         if(err){console.log("ERROR IN FINDING USER IN DB -----> PASSPORT"); return;}

       return done(null, rows[0]);
    });
 });
 

//check if th euser is authenticated
passport.checkAuthentication = function(req, res, next){
   // if the user is signed in, then pass the request to the next function(controllers action)
   if(req.isAuthenticated()){
       return next();
   }

   // if the user is not signed in
   return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
   if(req.isAuthenticated()){
       //req.user contains the current signed in user from the session cookie and we are just sending this to locals fro the views
       res.locals.user = req.user.user_id;
   }
   next();
}


module.exports = passport;
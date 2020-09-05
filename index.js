const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const cookieParser = require('cookie-parser');
const mysql = require('./config/mySQL');
const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/passport');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');

//use this to read from post requests
app.use(express.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
   name: 'starwisp',
   secret: 'justasecret',
   resave:false,
   saveUninitialized: false,
   cookie: {
      maxAge: (1000 * 60 * 500)
   }
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/'));

app.listen(3000, function(err){
   if(err){
      console.log('error running in server', err);
      return;
   }
   console.log('Successfully running on port', 3000);
});
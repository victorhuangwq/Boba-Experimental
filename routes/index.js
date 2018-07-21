var express = require('express');
var router = express.Router();

var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

/* Passport*/
router.use(bodyParser.urlencoded({extended:true}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy({
    passReqToCallback: true
  },
  function(req,username, password, done) {
      var db = req.db;
      console.log('select * from users where username="'+ username+'"');
      db.query("select * from users where username='"+ username+"'",(err,user) => {
        
        if(err) throw err;

        console.log(user.rows);

        //if user does not exist
        if(!user.rows[0]){
          console.log("not exist");
          return done(null,false, {message:'User does not exist!'})
        }

        //If password incorrect
        if(user.rows[0].password != password){
          console.log("password wrong");
          return done(null,false,{message:"Wrong Password!"});
        }
        else{
          console.log("success");
          return done(null,user.rows[0]);
        }
      });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null,user);
});


/* Home Page */
// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Boba Blog'});
});

/* Login Page */
// GET login page
router.get('/login', function(req,res,next){
  if(req.isAuthenticated()){
    req.flash('info','Already Logged in');
    res.redirect('/edit');
  }
  res.render('login',{message: req.flash('error')});
});

router.post('/login',
  passport.authenticate('local', { 
    failureRedirect: '/login',
    failureFlash: true
  }),
  function(req, res) {
    req.flash('info','Log in Successful');
    res.redirect('/edit');
  });

router.get('/logout',function(req,res){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

// GET logout
router.get('/logout',function(req,res){
  req.logout();
  req.session.destroy();
  req.flash('info','Logged out successfully');
  res.redirect('/');
});

/* Register Page */
// Get Register Page
router.get('/register',function(req,res,next){
  res.render('register');
});

/* Edit Page*/
//Get edit page
router.get('/edit', function(req, res, next){
  if(req.isAuthenticated())res.render('edit');
  else
    res.redirect('/login');
});

module.exports = router;

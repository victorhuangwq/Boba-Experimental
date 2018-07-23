var express = require('express');
var router = express.Router();

var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var uuidV1 = require('uuid/v1');

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
      db.query("select username,password from users where username=$1",[username],(err,user) => {
        
        if(err) throw err;

        console.log(user.rows);

        //if user does not exist
        if(!user.rows[0]){
          console.log("not exist");
          return done(null,false, {message:'User does not exist!'})
        }

        bcrypt.compare(password, user.rows[0].password, function(err, res) {
          if(res) {
           // Passwords match
           console.log("success");
           return done(null,user.rows[0]);
          } else {
           // Passwords don't match
           console.log("password wrong");
           return done(null,false,{message:"Wrong Password!"});
          } 
        });

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

router.post('/register', function(req, res) {
    var db = req.db;

    //Checking password = retry, and whether user exists should also be done in frontend javascript
    console.log(req.body.password);
    // Hash password
    let hash = bcrypt.hashSync(req.body.password,5);

    // Registering User
    db.query("INSERT INTO users(id,username,password,email) values($1,$2,$3,$4)",
        [uuidV1(),req.body.username,hash,req.body.email],function(err){
          if(err) throw err;

          req.flash('info','Registering Successful');
          res.redirect('/login');
        });
});

/* Edit Page*/
//Get edit page
router.get('/edit', function(req, res, next){
  if(req.isAuthenticated())res.render('edit');
  else
    res.redirect('/login');
});

module.exports = router;

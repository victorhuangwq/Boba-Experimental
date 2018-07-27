var express = require('express');
var router = express.Router();
var moment = require('moment');
var imgur = require('imgur-node-api');
imgur.setClientID('0a4bc22df468258');
var fileUpload = require('express-fileupload');
router.use(fileUpload());

/* GET review listing. */
router.get('/reviewlist', function(req, res, next) {
  var db = req.db;
  
  db.query('SELECT * FROM reviews',(err,docs) => {
    if(err) throw err;
    res.json(docs.rows);
  });
});

router.post('/addpost', function(req, res) {
  console.log(req.files.image.name);
  req.files.image.mv('/images/temp.jpg',function(err){
    if(err)
      return res.status(500).send(err);
  });
  /** 
  imgur.upload(req.files.image.data,function(err,res){
    console.log(res.data.link);
  });
 
  if(req.isUnauthenticated()) res.redirect('/login')
  else{
    var db= req.db;
    db.query("INSERT INTO reviews(userid,title,review,image,milk_stars,"+
    "tea_stars,aftertaste_stars,overall_stars,date)"+
    "values($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [req.user.id,req.body.title,req.body.description,req.body.imagelink,
      req.body.ms,req.body.ts,req.body.as,req.body.os,moment().format("MMM Do YY")],function(err){
      if(err) throw err;

      req.flash('info','Review Added');
      res.redirect('/');
    });
  }
  **/
});

router.post('/editpost', function(req, res) {

  console.log(req.body.description);

  if(req.isUnauthenticated()) res.redirect('/login')
  else{
    var db= req.db;
    db.query("UPDATE reviews SET title=$1,review=$2,image=$3,milk_stars=$4,"+
    "tea_stars=$5,aftertaste_stars=$6,overall_stars=$7,datem=$8"+
    "WHERE num = $9",
    [req.body.title,req.body.description,req.body.imagelink,
      req.body.ms,req.body.ts,req.body.as,req.body.os,moment().format("MMM Do YY"),req.body.num],function(err){
      if(err) throw err;

      req.flash('info','Review Edited');
      res.redirect('/');
    });
  }
});

/* GET review listing. */
router.get('/userreviews', function(req, res, next) {
  if(req.isUnauthenticated()) res.status(403).send('Forbidden');
  else{
    var db = req.db;
    db.query('SELECT * FROM reviews where userid=$1',[req.user.id],(err,docs) => {
      if(err) throw err;
      res.json(docs.rows);
    });
  }
});

module.exports = router;

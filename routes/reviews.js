var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET review listing. */
router.get('/reviewlist', function(req, res, next) {
  var db = req.db;
  
  db.query('SELECT * FROM reviews',(err,docs) => {
    if(err) throw err;
    res.json(docs.rows);
  });

});

router.post('/addpost', function(req, res) {


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
});

module.exports = router;

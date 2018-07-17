var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/reviewlist', function(req, res, next) {
  console.log('Here A');
  var db = req.db;
  
  db.query('SELECT * FROM reviews',(err,docs) => {
    if(err) throw err;
    res.json(docs.rows);
  });

});

module.exports = router;

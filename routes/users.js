var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
  var db = req.db;
  
  db.query('SELECT username FROM users',(err,docs) => {
    if(err) throw err;
    res.json(docs.rows);
  });

});

module.exports = router;

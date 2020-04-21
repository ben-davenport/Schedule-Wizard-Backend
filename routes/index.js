var express = require('express');
var router = express.Router();
const db = require('../db');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{});
});

router.get('/profiles',(req, res, next)=>{
  const businessId = 1;
  const getProfilesQuery = `SELECT firstname, lastname, email, admin_user FROM users WHERE business_id=?`
  db.query(getProfilesQuery, [businessId], (err, results)=>{
    if(err) throw err;
    res.json(results);
  })
})


module.exports = router;

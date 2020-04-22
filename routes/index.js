var express = require('express');
var router = express.Router();
const db = require('../db');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{});
});

router.get('/profiles', async (req, res, next)=>{
  const businessId = req.params;
  console.log(businessId)
  console.log('req received')
  const getProfilesQuery = `SELECT id, firstname, lastname, email, is_admin FROM users WHERE business_id=1`
  // await db.any(getProfilesQuery, [businessId])
  await db.any(getProfilesQuery)
    .then((results)=>{
      console.log(results)
      res.json(results)
    })
    .catch(err =>{
      console.log(err)
    })
  });

router.get('/profile/:profileId',async (req, res)=>{
    console.log('indiv profile request')
    const profileId = req.params.profileId;
    const getProfileQuery = `SELECT id, firstname, lastname, email, is_admin FROM users 
      WHERE id = $1`;
    
    await db.one(getProfileQuery, [profileId])
      .then((result)=>{
        console.log(result)
        res.json(result)
      })
      .catch(err=>{console.log(err)})
    })


module.exports = router;

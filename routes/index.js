var express = require('express');
var router = express.Router();
const db = require('../db');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{});
});

router.get('/avilability', async (req, res, next)=>{
  const getAvailability = `SELECT * FROM is_available WHERE business_id=1`
  db.any(getAvailability)
    .then((results)=>{
      console.log("-------availability------")
      console.log(results)
      res.json(results)})
    .catch(err=>console.log(err))
})

router.get('/timeoff', async (req, res, next)=>{
  const getAvailability = `SELECT * FROM timeoff WHERE business_id=1`
  db.any(getAvailability)
    .then((results)=>{
      console.log("-------Time Off------")
      console.log(results)
      res.json(results)})
    .catch(err=>console.log(err))
})

router.get('/myAvailability', async (req, res, next)=>{
  const getMyAvailability = `SELECT * FROM is_available WHERE business_id=1 AND user_id=1`
  db.any(getMyAvailability)
    .then((results)=>{
      console.log(results)
      res.json(results)})
    .catch(err=>console.log(err))
})

router.get('/allshifts', async (req,res,next)=>{
  const getAllShifts = `SELECT shift.*, users.firstname, users.lastname FROM shift LEFT JOIN users ON shift.user_id = users.id`
  db.any(getAllShifts)
    .then((results)=>{
      console.log("-------all shifts------")
      console.log(results)
      res.json(results)
    })
    .catch(err=>console.log(err))
})

router.get('/todayshifts', async (req,res,next)=>{
  const getTodayShifts = `SELECT * FROM shift WHERE business_id=1 AND start_time = current_date`
  db.any(getTodayShifts)
    .then((results)=>{
      console.log(results)
      res.json(results)
    })
    .catch(err=>console.log(err))
})


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
 
var express = require('express');
var router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const randToken = require('rand-token');
const cookie = require('../cookie');
const checkAuth = require('./middleware/checkAuth');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//check valid data middleware
const isValidData = (req, res, next)=>{
  const { first,last,email,password } = req.body;
  if((!first) || (!last) || (!email) || (!password)){
    res.json({
      msg: "invalidData"
    })
  }
    else{
      next()
    };
};

//check user query middleware
const checkUser = async (req, res, next) =>{
  checkUserQuery =  `SELECT * FROM users WHERE email=$1`;
  await db.any(checkUserQuery, [req.body.email])
  .then(
    (resp)=>{
      if (resp.length > 0){
        console.log('they exist');
        res.json({
          msg: 'userExists'
        })
      }
      else{
        // res.redirect('/u/dashboard');
        next();
      }
    }
  )
};

//post user middleware
const postUser = async(req, res, next) =>{
  console.log('posting user')
  const { first,last,email,password } = req.body;
  const insertUserQuery = `INSERT INTO users (firstname, lastname, email, pw, token)
    VALUES ($1,$2,$3,$4,$5)
    returning id, firstname, lastname, email, is_admin, token`;
  console.log('made it to insertUsersQuery')
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
    console.log(hash.length)
  const token = randToken.uid(49)
  try{
  db.one(insertUserQuery, [first, last, email, hash, token])
    .then((resp)=>{
      const {email, firstname, lastname, is_admin, token} = resp;
      res.json({
        msg: "userAdded",
        token,
        email,
        firstname,
        lastname,
        is_admin 
    });
  });
  }
  catch(err){console.log(err)}
  finally{next()};
}

const addCookie = async(req, res, next)=>{
  try{
  console.log('cookie time')
  res.setHeader('Cache-Control', 'private');
  res.cookie('accessTokenBD', res.json.token, cookie);
  console.log(res.cookie.accessTokenBD)
  }
  catch(err){
    console.log(err)
  }
  // finally{
  //   res.redirect('http://localhost:3000/u/dashboard')
  // }
}

//post a signup 
router.post('/signup', isValidData, checkUser,postUser, addCookie, async (req, res, next)=>{
  console.log(req.cookies)
});


router.post('/login', async(req, res ,next)=>{
  const { email, password} = req.body;
  const checkUserQuery = `SELECT * FROM users WHERE email = $1`;
  await db.any(checkUserQuery, [email])
    .then(
      (resp) => {
        if(resp.length > 0){
          console.log(resp)
          //this user has been found
          const thisUser = results[0];

          //check password
          const isValidPass = bcrypt.compareSync(password, thisUser.password);
          if(isValidPass){
            //user checks out
            res.json({
              msg: "loggedIn",
              firstname: thisUser.firstname,
              lastname: thisUser.lastname,
              business: thisUser.business_id,
              admin: thisUser.is_admin.toString(),
            });
            res.cookie('accessToken', accessToken, cookie);
            // res.redirect('/u/dashboard');
          }
        else{
          res.json({
            msg: 'noUser'
          })
        }
        }
        else{
          res.json({
            msg: "noUser"
          })
        }
      })
      .catch(err=>{
        res.redirect('/');
        throw err;
      });
});





module.exports = router;

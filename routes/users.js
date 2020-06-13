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

//check signup is valid
router.post('/signup', async (req, res, next)=>{
  console.log('req body:')
  console.log(req.body)
  const { first,last,email,password } = req.body;

  // check if data is valid
  if((!first) || (!last) || (!email) || (!password)){
    res.json({
      msg: "invalidData"
    });
    return;
  };

  //data is valid, check if user exists
  const checkUserQuery = `SELECT * FROM users WHERE email=$1`;
  await db.any(checkUserQuery, [email])
    .then(
      (resp) => {
        console.log('check user')
        console.log(resp)
        if(resp.length > 0){
          console.log('they exist')
          console.log(resp)
          //this email has been assigned
          res.json({
            msg: "userExists"
          })
        }

        //this email has not been used; post the user
        else{
          const insertUserQuery = `INSERT INTO users (firstname, lastname, email, pw, token)
            VALUES ($1,$2,$3,$4,$5)
            returning id, firstname, lastname, email, admin, token`;
            console.log('made it to insertUsersQuery')
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          const token = randToken.uid(50)
          db.one(insertUserQuery, [first, last, email, hash, token])
            .then((resp2)=>{
              console.log(resp2)
              console.log('cookie time')
              res.cookie('accessToken', accessToken, cookie);
              res.redirect('/u/dashboard');
              const {email, firstname, lastname, admin, token} = resp;
              res.json({
                msg: "userAdded",
                token,
                email,
                firstname,
                lastname,
                business,
                admin
              })
            })
            .catch(err => {
              console.log('error')
              res.json({msg: "error"});
              throw err
            }
            )
        }
      }
      )
    .catch(err=>{ throw err});
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
              admin: thisUser.admin,
            });
            res.cookie('accessToken', accessToken, cookie);
            res.redirect('/u/dashboard');
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

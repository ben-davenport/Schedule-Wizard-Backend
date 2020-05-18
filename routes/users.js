var express = require('express');
var router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const randToken = require('rand-token');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//check signup is valid
router.post('/signup', async (req, res, next)=>{
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
        console.log(resp)
        if(resp.length > 0){
          console.log(resp)
          //this email has been assigned
          res.json({
            msg: "userExists"
          })
        }

        //this email has not been used; post the user
        else{
          const insertUserQuery = `INSERT INTO users (first, last, email, password, token)
            VALUES ($1,$2,$3,$4,$5)
            returning id`;
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          const token = randToken.uid(50)
          db.one(insertUserQuery, [first, last, email, hash, token])
            .then((resp)=>{
              res.json({
                msg: "userAdded",
                token,
                email,
                first,
                last
              })
            })
            .catch(err => res.json({msg: "error"}))
        }
      }
      )
    .catch(err=>{ throw err});
}

module.exports = router;

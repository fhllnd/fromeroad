require('dotenv').config();
const { expressjwt: ejwt } = require("express-jwt");
const jwt = require('jsonwebtoken');
var db = require('..');
var express = require('express');
app = express()

app.get('/:token', (req, res) => {
  const token = req.params.token;
  console.log(token)

  // Verifying the JWT token 
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    console.log(decoded)
      if (err) {
        console.log(err);
        res.send("Email verification failed, possibly the link is invalid or expired");
      }
      else {
        // get userid
        db.query('update users set verified = 1 where userID = ?', [decoded.userID], (err, result, fields) => {
          if (err) {
            console.log('error occurred: '+ err)
          } else {
            res.send(`Hi ${decoded.name}, your email has been verified successfully`);
          }
        })
        
      }
  });
})

app.put('/reverify', ejwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), (req, res) => {
  const userID = req.body.userID
  const name = req.body.name
  const email = req.body.email
  sendEmail(userID, email, name)
})

module.exports = app


const express = require('express');
let router = express.Router();


const User = require('../data/users');
const bcrypt = require("bcryptjs");
const { issueJWT } = require('../utils/utils');

// Authentification 
router.post("/", (req, res, next) => {
    try{
      User.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(403).json({ 'message': 'Username and password didn t match.' });
        if (!user) return res.status(401).json({ 'message': 'Username not exist.' });
    
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) throw err;
            const isValidPwd = result === true
            if (isValidPwd) {
              const tokenObject = issueJWT(user);
              console.log(user);
              res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires})
            }
            else{
              console.log(req.body.password);
              console.log(user.password);
               res.status(401).json({ 'message': 'Wrong Credentials.' });
            }
        });
    
    
        
    
        
      });
  
    }catch(err){
      res.status(600).json({ 'message': 'there is a problem with the token.' });
    }
    
  });

module.exports = router;
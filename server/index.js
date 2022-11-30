const express = require('express');
const { default: mongoose } = require('mongoose');
const connectDB = require('./mongorequest');
const {createUsers, createPixelBoards} = require('./init');
const cors = require('cors');
const User = require('./data/users');
const PixelBoard = require('./data/PixelBoards');
const passport = require('passport');
const passportJWT = require('./passportJWT');
const { issueJWT, isPasswordValid } = require('./utils');


const bcrypt = require("bcryptjs");


const app = express();
connectDB();
const PORT = 3500;


app.use(cors({origin: true, credentials: true}));


app.use(express.json());

  
app.use(express.urlencoded({ extended: true }));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
// app.use(passport.session());


passportJWT(passport);

const saveUser = async (userName, passWord, firstName, lastName) => {

    User.findOne({ username: userName}, async (err, doc) => {
      try {
        if(err) throw new Error('une erreur est survenu');
        if(doc) throw new Error('User already exist.'); 
        if(!doc) {
            const hashpwd = await bcrypt.hash(passWord, 10);
                await User.create({
                username: userName,
                password: hashpwd,
                firstname: firstName? firstName : null,
                lastname: lastName? lastName : null
        
            });
                
        
        }
        
      } catch (error) {
        return error;
        
      }

     })

   

    
};
const savePB = async (titlex, statutx, dealinex, boardSizex, authorx, pixelModificationx, timeLimitx) => {
    
    await PixelBoard.create({     
        title: titlex? titlex : null,
        statut: statutx? statutx : false,
        dealine: dealinex,
        boardSize: boardSizex,
        author: authorx,
        pixelModification: pixelModificationx,
        timeLimit: timeLimitx? timeLimitx : 0

    }).then(console.log).catch((err)=> console.log(err));
    
};


app.post("/homepage", passport.authenticate('jwt', {session: false}),(req, res, next) => {
  res.status(200).json({ success: true, msg: "You are connected"})
});
  
app.post("/login", (req, res, next) => {
  try{
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) return res.status(403).json({ 'message': 'Username and password didn t match.' });
      if (!user) return res.status(401).json({ 'message': 'Username not exist.' });
  
      bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) throw err;
          console.log("le resultat est : " + result);
          console.log( result === true)
          const isValidPwd = result === true
          if (isValidPwd) {
            const tokenObject = issueJWT(user);
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
app.post("/creaseUser",  (req, res) => {
     const userName = req.body.userName;
     const password = req.body.password;
     const firstName = req.body.firstName;
     const lastName = req.body.lastName;
     if(!userName || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
 

    
    User.findOne({ username: userName}, async (err, doc) => {
        if(err) return res.status(700).json({ 'message': 'An error has occured.' })
        if(doc) return res.status(600).json({ 'message': 'User already exist.' })  
        if(!doc) {
            const hashpwd = await bcrypt.hash(password, 10);

                const newUser = await User.create({
                username: userName,
                password: hashpwd,
                firstname: firstName? firstName : null,
                lastname: lastName? lastName : null
        
            });

            const jwt = issueJWT(newUser);

            res.json({ success: true, user: newUser, token: jwt.token, expiresIn: jwt.expires})
    
      } 

    })

    
     
});


app.post("/creasePB", (req, res) => {
     const title = req.body.title;
     const statut = req.body.statut;
     const dealine = req.body.dealine;
     const boardSize = req.body.boardSize;
     const author = req.body.author;
     const pixelModification = req.body.pixelModification;
     const timeLimit = req.body.timeLimit;

    // if(!author || !dealine || timeLimit) return res.status(400).json({ 'message': 'Username and password are required.' });

     savePB(title, statut, dealine, boardSize, author, pixelModification, timeLimit);
     
});

mongoose.connection.once('open', () => {
    console.log("conected to the DataBase!");
    createUsers().catch(console.error())
    createPixelBoards().catch(console.error());
    app.listen(PORT, ()=>{
         console.log('the Api is listenning at port : ' + PORT);
    });

})



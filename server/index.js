const express = require('express');
const { default: mongoose } = require('mongoose');
const connectDB = require('./mongorequest');
const {createUsers, createPixelBoards} = require('./init');
const cors = require('cors');
const User = require('./data/users');

const app = express();
// connexion to DataBase
connectDB();
const PORT = 3500;

// erreur de network car on est en local sur 2 port differents
app.use(cors({origin: true, credentials: true}));

// For parsing application/json
app.use(express.json());

  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const saveUser = async (userName, passWord, firstName, lastName) => {
   
    await User.create({
        username: userName,
        password: passWord,
        firstname: firstName? firstName : null,
        lastname: lastName? lastName : null

    });
    
};
// const savePB = async (titlex, statutx, dealinex, boardSizex, authorx, pixelModificationx, timeLimitx) => {
   
//     await User.create({
//         title: titlex? titlex : null,
//         statut: statutx? statutx : null,
//         dealine: dealinex,
//         boardSize: boardSizex,
//         author: authorx,
//         pixelModification: pixelModificationx,
//         timeLimit: timeLimitx? timeLimitx : null

//     });
    
// };


app.post("/creaseUser", (req, res) => {
     const userName = req.body.userName;
     const password = req.body.password;
     const firstName = req.body.firstName;
     const lastName = req.body.lastName;
     if(!userName || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

     saveUser(userName, password,firstName, lastName);
     
});

 

// app.post("/creasePB", (req, res) => {
//      const title = req.body.title;
//      const statut = req.body.statut;
//      const dealine = req.body.dealine;
//      const boardSize = req.body.boardSize;
//      const author = req.body.author;
//      const pixelModification = req.body.pixelModification;
//      const timeLimit = req.body.timeLimit;

//      if(!author || !dealine || pixelModification || timeLimit) return res.status(400).json({ 'message': 'Username and password are required.' });

//      savePB(title, statut, dealine, boardSize, author, pixelModification, timeLimit);
     
// });


mongoose.connection.once('open', () => {
    console.log("conected to the DataBase!");
    createUsers().catch(console.error())
    createPixelBoards().catch(console.error());
    app.listen(PORT, ()=>{
         console.log('the Api is listenning at port : ' + PORT);
    });

})

const express = require('express');
const { default: mongoose } = require('mongoose');
const connectDB = require('./mongorequest');
const {createUsers, createPixelBoards} = require('./init');

const app = express();
// connexion to DataBase
connectDB();
const PORT = 3500;


mongoose.connection.once('open', () => {
    console.log("conected to the DataBase!");
    createUsers();
    createPixelBoards();
    app.listen(PORT, ()=>{
         console.log('the Api is listenning at port : '+ `${PORT}`);
    });

})

const express = require('express');
const {default: mongoose} = require('mongoose');
const connectDB = require('./utils/mongorequest');
// const {createUsers, createPixelBoards} = require('./Services/initialisationData');
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('./utils/passportJWT');
const login = require('./routes/login');
const register = require('./routes/register');
const theme = require('./routes/AboutTheme');
const pixelboard = require('./routes/pixelboard');
const users = require('./routes/users');


const app = express();
connectDB();
const PORT = 3500;

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
passportJWT(passport);

// app.post("/homepage", passport.authenticate('jwt', {session: false}),(req, res, next) => {
//   res.status(200).json({ success: true, msg: "You are connected"})
// });

app.use("/login", login);
app.use("/creaseUser", register);
app.use("/theme", theme);
app.use("/pixelboard", pixelboard);
app.use("/users", users)

mongoose.connection.once('open', () => {
    console.log("Connected to the DataBase!");
    // createUsers().catch(console.error())
    // createPixelBoards().catch(console.error());
    app.listen(PORT, () => {
        console.log('the Api is listenning at port : ' + PORT);
    });
})
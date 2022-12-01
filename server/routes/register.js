const express = require('express');
let router = express.Router();

const User = require('../data/users');
const bcrypt = require("bcryptjs");
const { issueJWT } = require('../utils/utils');


// Registration
router.post("/", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    if (!userName || !password) return res.status(400).json({ 'message': 'Username and password are required.' });



    User.findOne({ username: userName }, async (err, doc) => {
        if (err) return res.status(700).json({ 'message': 'An error has occured.' })
        if (doc) return res.status(600).json({ 'message': 'User already exist.' })
        if (!doc) {
            const hashpwd = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username: userName,
                password: hashpwd,
                firstname: firstName ? firstName : null,
                lastname: lastName ? lastName : null

            });

            const jwt = issueJWT(newUser);

            res.json({ success: true, user: newUser, token: jwt.token, expiresIn: jwt.expires })

        }

    })



});


module.exports = router;
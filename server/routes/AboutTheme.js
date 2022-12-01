const express = require('express');
let router = express.Router();


const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../data/users');
const { default: mongoose } = require('mongoose');

router.post("/update", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    console.log(req.headers.authorization);
    console.log(req.body.theme);
    const authorization = req.headers.authorization.split(' ')[1];
    const JwtDecoded = jsonwebtoken.verify(authorization, "secrets");
    console.log(JwtDecoded.sub);
    const userId = JwtDecoded.sub
    try {
        await User.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(userId) }, { "theme": req.body.theme });
        res.status(200).json({ success: true, reponse: req.body.theme, id: mongoose.Types.ObjectId(userId) });
    } catch (err) {
        console.log("update: " + err);
    }

});


router.get("/get", passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const authorization = req.headers.authorization.split(' ')[1];
    const JwtDecoded = jsonwebtoken.verify(authorization, "secrets");
    console.log(JwtDecoded.sub);
    const userId = JwtDecoded.sub;
    try {
        User.findById(mongoose.Types.ObjectId(userId), function (err, docs) {
            if (err) {
                res.status(401).json({ success: false, msg: 'Unauthorized' });
            }
            else {
                console.log(mongoose.Types.ObjectId(userId));
                console.log("Result : ", docs);
                console.log(docs.theme);
                const th = docs.theme;
                res.status(200).json({ success: true, theme: th });
            }
        })


    }
    catch (err) {
        res.status(500).json({ success: false, msg: 'Server does not respond' });
    }

});


module.exports = router;
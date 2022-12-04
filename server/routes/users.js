const express = require('express');
let router = express.Router();

const User = require('../data/users');

router.get("/count", async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({success: true, count: users.length});
    } catch(err){
        console.log(err);
        res.status(500).json({ 'message': 'Server does not respond' });
    }
});

module.exports = router;
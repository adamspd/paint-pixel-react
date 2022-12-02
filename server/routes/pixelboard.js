const express = require('express');
let router = express.Router();

const {createPixelBoard } = require('../Services/pixelBdQueries');


router.post("/create", async (req, res) => {
    if (!req.body.boardSize || req.body.pixelModification === null || !req.body.timeLimit) {
        console.log("pb pixel creation");
        return res.status(400).json({'msg': 'Missing arguments'});
    }
    const title = req.body.title ? req.body.title : null;
    const statut = req.body.statut ? req.body.title : null;
    const dealine = req.body.dealine // rerquired
    const boardSize = req.body.boardSize; // required
    const author = req.body.author ? req.body.title : null;
    const pixelModification = req.body.pixelModification // required
    const timeLimit = req.body.timeLimit // required

    await createPixelBoard(title, statut, dealine, boardSize, author, pixelModification, timeLimit);
    res.status(201).json({ 'message': 'PixelBoard Created !.' });

   
    
});

module.exports = router;
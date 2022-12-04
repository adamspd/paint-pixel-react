const express = require('express');
let router = express.Router();

const pixelboard = require('../data/PixelBoards');
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

router.get("/count", async (req, res) => {
    try{
        const pb = await pixelboard.find();
        res.status(200).json({success: true, count: pb.length});
    } catch(err){
        console.log(err);
        res.status(500).json({ 'message': 'Server does not respond' });
    }
});

module.exports = router;
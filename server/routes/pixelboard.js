const express = require('express');
let router = express.Router();
const PixelBoard = require('../data/PixelBoards');

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


router.post("/create", (req, res) => {
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

module.exports = router;
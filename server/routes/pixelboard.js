const express = require('express');
let router = express.Router();

const pixelboard = require('../data/PixelBoards');
const {createPixelBoard} = require('../Services/pixelBdQueries');

router.post("/create", async (req, res) => {
    if (!req.body.boardSize || req.body.pixelModification === null || !req.body.timeLimit) {
        console.log("pb pixel creation");
        return res.status(400).json({'msg': 'Missing arguments'});
    }
    const title = req.body.title ? req.body.title : null;
   // const status = req.body.status ? req.body.title : null;
    const deadline = req.body.deadline // rerquired
    const boardSize = req.body.boardSize; // required
    const author = req.body.author ? req.body.author : null;
    const pixelModification = req.body.pixelModification // required
    const timeLimit = req.body.timeLimit // required
    const pixelBoards = null;
    const id = await createPixelBoard(title, deadline, boardSize, author, pixelModification, timeLimit, pixelBoards);
    console.log("id", id);
    return res.status(200).json({'id': id, 'msg': 'PixelBoard created'});
    // await createPixelBoard(title, deadline, boardSize, author, pixelModification, timeLimit);
    // send id of the pixelboard created

    // res.status(201).json({ 'message': 'PixelBoard Created !.' });
});

router.patch("/update-pb/:id", async (req, res) => {
    const pixelboards = req.body.pixelboard // required
    const id = req.params.id;
    try {
        await pixelboard.findByIdAndUpdate(id, { pixelboards: pixelboards });
        res.status(200).json({ 'message': 'PixelBoard Updated !.' });
    } catch (err) {
        res.status(400).json({ 'message': 'PixelBoard not found !.' });
    }
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

router.get("/listpixelboard", async (req, res) => {
    try{
        const listpb = await pixelboard.find();
        res.status(200).json({success: true, list: listpb});
    } catch(err){
        console.log(err);
        res.status(500).json({ 'message': 'Server does not respond' });
    }
});

router.get('/byauthor/:author', async (req, res) => {
    try {
        const pixelboards = await pixelboard.find({author: req.params.author});
        res.status(200).json({success: true, 'pb': pixelboards});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, 'message': 'Server does not respond'});
    }
});

// find last pixelboard author created
router.get('/byauthor/:author/last', async (req, res) => {
    try {
        const pixelboards = await pixelboard.find({author: req.params.author}).sort({createdAt: -1}).limit(1);
        res.status(200).json({success: true, 'pb': pixelboards});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, 'message': 'Server does not respond'});
    }
});

router.get('/bytitleauthor/:title/:author', async (req, res) => {
    console.log(">>> params ", req.params);
    if (!req.params.title)
        return res.status(400).json({'msg': 'Missing arguments'});
    if (!req.params.author)
        return res.status(400).json({'msg': 'Missing arguments'});

    console.log("Queried by title & author function called ", req.params.title.author, req.params.author)
    try {
        const pixelboards = await pixelboard.find({title: req.params.title, author: req.params.author});
        res.status(200).json({success: true, 'pb': pixelboards});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, 'message': 'Server does not respond'});
    }
});

router.put('/modifypixelboard/:id', async (req, res) => {
    console.log(">>> params ", req.params);
    console.log(">>> body ", req.body);
    if (!req.params.id)
        return res.status(400).json({'msg': 'Missing arguments'});
   if (!req.body)
        return res.status(400).json({'msg': 'Missing body'});

    console.log("Update pb ", req.params.id);

    try {
        const pixelboards = await pixelboard.findByIdAndUpdate(
            req.params.id,
            {
                title: (req.body.title) ? req.body.title : null,
                dealine : req.body.dealine,// rerquired
                boardSize : req.body.boardSize, // required
                author : req.body.author ? req.body.author : null,
                pixelModification : req.body.pixelModification,// required
                timeLimit: req.body.timeLimit // required
            }
        );
        res.status(200).json({success: true, 'pb': pixelboards});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, 'message': 'Server does not respond'});
    }
});

router.delete('/deletepixelboard/:id', async (req, res) => {
    console.log(">>> params ", req.params);
    if (!req.params.id)
        return res.status(400).json({'msg': 'Missing arguments'});

    console.log("Delete pb ", req.params.id);

    try {
        const pixelboards = await pixelboard.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json({success: true, 'pb': pixelboards});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, 'message': 'Server does not respond'});
    }
});

module.exports = router;
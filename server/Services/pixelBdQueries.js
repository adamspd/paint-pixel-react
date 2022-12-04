const PixelBoard = require('../data/PixelBoards');

const listPixelBoard = () => {
    PixelBoard.find();
}

const createPixelBoard = async (title, dealine, boardSize, author, pixelModification, timeLimit) => {

    await PixelBoard.create({
        title,
        dealine,
        boardSize,
        author,
        pixelModification,
        timeLimit,

    }).then(console.log).catch((err) => console.log(err));

};

module.exports = {listPixelBoard, createPixelBoard}
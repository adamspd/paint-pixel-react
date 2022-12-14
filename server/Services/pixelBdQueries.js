const PixelBoard = require('../data/PixelBoards');

const listPixelBoard = () => {
    PixelBoard.find();
}

const createPixelBoard = async (title, deadline, boardSize, author, pixelModification, timeLimit) => {
    // return id of the pixelboard created
    const pixelboard = new PixelBoard({
        title: title,
        deadline: deadline,
        boardSize: boardSize,
        author: author,
        pixelModification: pixelModification,
        timeLimit: timeLimit,
        pixelBoards: []
    });
    await pixelboard.save();
    return pixelboard._id;
};

module.exports = {listPixelBoard, createPixelBoard}
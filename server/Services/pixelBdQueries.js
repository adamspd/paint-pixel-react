const PixelBoard =  require('../data/PixelBoards');

const listPixelBoard = () => {
    PixelBoard.find();
}

module.exports = listPixelBoard
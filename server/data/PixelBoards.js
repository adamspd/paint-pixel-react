const mongoose = require('mongoose');
const { Schema } = mongoose;


const PixelBoardSchema = new Schema({
    title: String,
    statut: { type: Boolean, default: true},
    createdAt: { type: Date, default: Date.now},
    dealine: { type: Date},
    boardSize: {type: Number, required: true},
    author: { type: String},
    pixelModification: {type: Boolean, required: true},
    timeLimit: {type: Number, required: true},
    // pixelBoards: {type: Array, required: false}
})

module.exports = mongoose.model('PixelBoard', PixelBoardSchema)
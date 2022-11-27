const mongoose = require('mongoose');
const { Schema } = mongoose;


const PixelBoardSchema = new Schema({
    title: String,
    statut: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now},
    dealine: { type: Date},
    boardSize: {type: Number, required: true},
    author: { type: String},
    pixelModification: {type: Boolean, required: true},
    timeLimit: {type: Number, required: true},
    
})

module.exports = mongoose.model('PixelBoard', PixelBoardSchema)
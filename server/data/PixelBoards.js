const mongoose = require('mongoose');
const { Schema } = mongoose;


const PixelBoardSchema = new Schema({
    title: String,
    statut: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now},
    dealine: { type: Date, required: true},
    boardSize: {type: Number, required: true},
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    pixelModification: {type: Boolean, required: true},
    timeLimit: {type: Number, required: true},
    
})

module.exports = mongoose.model('PixelBoard', PixelBoardSchema)
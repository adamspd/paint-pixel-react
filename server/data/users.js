const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({

    username :  {
        type: String, required: true
    },

    password: {
        type: String, required: true
    },

    firstname: String,

    lastname: String,
    theme: {
        type: String, default: 'light'
    }


});

module.exports = mongoose.model('User', userSchema)

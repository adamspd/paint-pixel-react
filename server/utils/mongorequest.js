const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test');
      //  connexion.catch(err => console.log(err));
        
    } catch (error) {
        console.error(error)
    }
}
 

module.exports = connectDB
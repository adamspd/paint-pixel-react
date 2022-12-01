const User = require('./data/users');
const jsonwebtoken = require('jsonwebtoken');

const retrieveUser = async(req,res) => {
    try{
        
    if (req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jsonwebtoken.verify(authorization, "secrets");
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        // Fetch the user by id 
       const user = await User.findOne({_id: userId}).then(function(user){
            // Do something with the user
            return user;
        });
    }
    throw new Error("server error");

    }catch(err){
        console.log("retrieveUser :" + err)
    }
}
module.exports = retrieveUser
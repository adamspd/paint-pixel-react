const jsonwebtoken = require('jsonwebtoken');
const  bcrypt  =  require( "bcryptjs" ) ;

const isPasswordValid = (password, userPassword) => {
    bcrypt.compare(password, userPassword, (err, result) => {
        if (err) throw err;
        return (result === true);

    });

}
const issueJWT = (user) => {
    const _id = user._id;
    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, "secrets", { expiresIn: expiresIn});

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
    }


module.exports.issueJWT = issueJWT;
const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        // const payload = { uid, name };

        const token = jwt.sign({uid, name}, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('Invalid token');
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}
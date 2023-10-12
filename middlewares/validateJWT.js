const { response } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');

    if(token === null || token === undefined){
        return res.status(401).json({
            success: false,
            msg: 'Invalid token (JWT) received',
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)
        req.uid = uid;
        req.name = name;
    } catch (err) {
        return res.status(401).json({
            success: false,
            msg: 'Invalid token (JWT) received',
        })     
    }
    next();
};

module.exports = { 
    validateJWT,
}
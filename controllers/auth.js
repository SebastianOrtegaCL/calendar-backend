const express = require('express');
const { validationResult } = require('express-validator');

const createUser = (req, res = express.response) => {

    const { name, email, password } = req.body;

    // manejo de errores

    const errors = validationResult( req );

    if ( !errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.mapped()
        });
    }

    res.json({
        success: true,
        msg: 'registro',
        name,
        email,
        password
    })
}

const userLogin = (req, res = express.response) => {

    const { email, password } = req.body;

    res.json({
        success: true,
        msg: 'login',
        email,
        password
    })
}

const revalidateToken = (req, res = express.response) => {


    res.json({
        success: true,
        msg: 'renew',
    })
}

module.exports = {
    createUser,
    userLogin,
    revalidateToken
}
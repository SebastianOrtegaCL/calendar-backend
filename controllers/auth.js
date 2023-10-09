const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');


const createUser = async(req, res = express.response) => {
    // const { name, email, password } = req.body; // post(req.body) from the user in the front-end
    try {
        const user = new User(req.body)

        await user.save();

        res.status(201).json({
            success: true,
            msg: 'registro',
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Please contact the administrator'
        })
    }

}

const userLogin = (req, res = express.response) => {

    const { email, password } = req.body;

    res.status(201).json({
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
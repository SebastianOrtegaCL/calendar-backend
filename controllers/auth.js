const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = express.response) => {
    const { email, password } = req.body; // post(req.body) from the user in the front-end
    try {
        // check if the user already exists in the db with findOne method( from mongoose )
        let user = await User.findOne({email});

        // bad request if email exists in the database
        if( user ){
            return res.status(400).json({
                success: false,
                msg: 'Email already taken'
            })
        }

        user = new User(req.body)

        // Before to save in the db, we need to encrypt the password
        // for encrypt the password we use bcrypt.js
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        // upload to db
        await user.save();
        // JWT json web token
        const token = await generateJWT( user.id, user.name );
        res.status(201).json({
            success: true,
            uid: user.uid,
            name: user.name,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Please contact the administrator'
        })
    }

}

const userLogin = async(req, res = express.response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user, 'LOGIN');
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: 'User and password do not match'
            });
        }

        const validatePassword = bcrypt.compareSync(password, user.password, );
        if( !validatePassword ) {
            return res.status(400).json({
                success: false,
                msg: 'User and password do not match'
            });
        }
        // Estamos listos para generar nuestro JWT (Json web token);
        // mongo by default put id like _uid ...
        const token = await generateJWT( user.id, user.name );
        console.log(user.uid, 'LOGIN TOKEN VAR');

        res.status(201).json({
            success: true,
            uid: user.id.valueOf(),
            name: user.name,
            token
        })

    }catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Please contact the administrator'
        });
    }
}

const revalidateToken = async (req, res = express.response) => {
    // get req from header (header x-token : ...
    // uid and name req, are from x-token
    const { uid, name } = req
    // Generate a new token JWT
    const token = await generateJWT(uid, name);
    res.json({
        success: true,
        token
    })
}

module.exports = {
    createUser,
    userLogin,
    revalidateToken
}
const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = express.response) => {
    const { email, password } = req.body; // post(req.body) from the user in the front-end
    try {
        let usuario = await User.findOne({email});

        // bad request if email exists in the database
        if( usuario ){
            return res.status(400).json({
                success: false,
                msg: 'Email already taken'
            })
        }

        const user = new User(req.body)

        // Before to save in the db, we need to encrypt the password
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        // upload to db
        await user.save();
        // JWT json web token
        const token = await generateJWT( user.uid, user.name );

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
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                success: false,
                msg: 'User and password do not match'
            });
        }

        const validatePassword = bcrypt.compareSync(password, usuario.password, );
        if( !validatePassword ) {
            return res.status(400).json({
                success: false,
                msg: 'User and password do not match'
            });
        }
        // Estamos listos para generar nuestro JWT (Json web token);

        const token = await generateJWT( usuario.uid, usuario.name );

        res.status(201).json({
            success: true,
            uid: usuario.id,
            name: usuario.name,
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
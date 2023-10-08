/*
    Route of user / Auth
    host + /api/auth   

*/

const { Router } = require('express');
const { check } = require('express-validator')
const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const router = Router();

router.post('/new', 
    [   //middlewares
        check('name', 'The name is required').not().isEmpty()
    ] ,
    createUser)

router.post('/', userLogin)

router.get('/renew', revalidateToken)

module.exports = router;
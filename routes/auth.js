/*
    Route of user / Auth
    host + /api/auth   

*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields');
const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT'); 

const router = Router();

//post
router.post('/new', 
    [   //middlewares
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').isLength({min: 2, max: 18}),
        validateFields
    ],
    createUser)
// post
router.post('/', 
    [// middlewares 
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').isLength({min: 6, max: 18}),
    validateFields
    ], 
    userLogin)
// get
router.get('/renew', validateJWT, revalidateToken)

module.exports = router;
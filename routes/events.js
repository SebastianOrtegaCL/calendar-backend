/*
    Event Routes
    /api/event
 */
const { Router} = require('express');
const { validateJWT } = require('../middlewares/validateJWT')
const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const {validateFields} = require("../middlewares/validateFields");
// Implement JWT authentication

const router = Router();
// validateJWT => middleware, Todas las rutas deben pasar por el middleware de validateJWT
router.use(validateJWT);
// Obtener eventos
router.get('/', getEvent);

//TODO: put toDate() in 'notes' field when backend get an date
router.post('/',
    [
        check('title', 'The title is required').not().isEmpty().isString(),
        check('notes', 'The notes is required').not().isEmpty(),
        check('start', 'The start date is required').not().isEmpty(),
        check('end', 'The end date is required').not().isEmpty(),
        validateFields
    ]
    ,createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router;
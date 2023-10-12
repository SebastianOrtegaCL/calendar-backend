/*
    Event Routes
    /api/event
 */
const { Router} = require('express');
const { validateJWT } = require('../middlewares/validateJWT')
const { getEvent, createEvent, updateEvent } = require('../controllers/events');

// Implement JWT authentication
// Obtener eventos
const router = Router();
// validateJWT => middleware
router.get('/', validateJWT, getEvent);

router.post('/', validateJWT, createEvent);

router.put('/', validateJWT, updateEvent);

// router.delete('/', deleteEvent);


module.exports = router;
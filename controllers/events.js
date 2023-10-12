const { response} = require('express');
const EventSchema = require('../models/event');

//
// {
//     success: true,
//     msg: 'obtain events...'
// }

const getEvent = (req, res = response) => {
    res.status(201).json({
        success: true,
        msg: 'Get event'
    });
}

const createEvent = (req, res = response) => {
    // verify th
    const { title, start, end } = req.body

    if (req.body) {

    }
    res.status(200).json({
        success: true,
        msg: 'Event created',
        title, start, end

    })
}

const updateEvent = (req, res) => {

    const {name, content} = req.body;

    res.status(200).json({
        success: true,
        msg: 'Event updated',
        name, content
    })
};

const deleteEvent = (req, res) => {
    const { uid } = req.body

    res.status(200).json({
        success: true,
        msg: 'Note deleted',
        uid
    })

};

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
};
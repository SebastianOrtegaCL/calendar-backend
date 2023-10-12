const { response} = require('express');

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

    const { name, content } = req.body
    console.log(req.body);

    res.status(200).json({
        success: true,
        msg: 'Event created',
        name, content

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
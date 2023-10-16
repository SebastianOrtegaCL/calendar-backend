const { response} = require('express');
const EventSchema = require('../models/event');
const Event = require('../models/event');
const {populate} = require("dotenv");
//
// {
//     success: true,
//     msg: 'obtain events...'
// }

const getEvent = async (req, res = response) => {
    // const {uid, name} = req;
    try{
        const events = await EventSchema.find()
                                        .populate('user', 'name');

        res.status(201).json({
            success: true,
            msg: 'Get event',
            events
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            msg: "Please contact to admin"
        })
    }


}

const createEvent = async (req, res = response) => {
    const event = new Event( req.body );
    try{

        event.user = req.uid;

        const eventSaved = await event.save();

        res.status(201).json({
            success: true,
            msg: 'Created',
            eventSaved
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Contact with the Admin',
        })
    }

}

const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    try{
        const checkEvent = await EventSchema.findById( eventId );
        if( !checkEvent ) {
            res.status(404).json({
                success: false,
                msg: '404'
            })
        }
        const eventUpdated = await EventSchema.findByIdAndUpdate(eventId, req.body);

        res.status(200).json({
            success: true,
            msg: 'Event updated',
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Contact with the admin',
        })
    }


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
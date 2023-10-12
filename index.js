const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// create express server instance
const app = express();

// Database
dbConnection();

// cors
app.use(cors());

// Public directory 
app.use( express.static('public'));

// read and parse of body data
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/events'));

// TODO: CRUD: eventos



// listen request
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

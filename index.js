const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');


// create express server instance
const app = express();

// Database
dbConnection();

// Public directory 
app.use( express.static('public'));

// read and parse of body data
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));

// TODO: CRUD: eventos



// listen request
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

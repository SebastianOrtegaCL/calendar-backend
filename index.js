const express = require('express');
require('dotenv').config();

// create express server instance
const app = express();

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

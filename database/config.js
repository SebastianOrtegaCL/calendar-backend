const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('Db connection established')
    } catch (err) {
        console.log(err);
        throw new Error('Error connecting to Mongo');
    }
}

module.exports = {
    dbConnection,
}
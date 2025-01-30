const mongoose = require('mongoose');

const connectDB = async (MONGODB_URI) => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
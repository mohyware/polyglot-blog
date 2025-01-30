// setup server
const express = require('express');
const app = express();

// .env
const dotenv = require('dotenv');
dotenv.config();

// db
const connectDB = require('./services/database/connection');

// route
const postRoute = require('./routes/post');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use("/api/v1", postRoute);

const port = process.env.PORT || 8080;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
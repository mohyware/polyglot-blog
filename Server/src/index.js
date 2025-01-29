// setup server
import express, { urlencoded, json } from 'express';
var app = express();
// .env
import dotenv from 'dotenv';
dotenv.config();
// db
import connectDB from './services/database/connection.js';
// route
import postRoute from './routes/post.js';
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))
// parse application/json
app.use(json());

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



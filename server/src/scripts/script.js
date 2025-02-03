const Post = require('../models/post');
const { StatusCodes } = require('http-status-codes');
//const summarize = require('../services/summarize');
const ApiError = require('../utils/api-error');

require('dotenv').config();
const connectDB = require('../config/database');
const { handleError } = require('../middlewares/error-handler');


const getAllPosts = async (a8a) => {
    try {
        const { query, page = 1, limit = 10 } = a8a;

        const searchQuery = query ? { title: { $regex: query, $options: "i" } } : {};
        console.log(searchQuery)
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const Posts = await Post.find(searchQuery).skip(skip).limit(parseInt(limit));

        const totalPosts = await Post.countDocuments(searchQuery);
        console.log("res ", {
            Posts,
            count: Posts.length,
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: parseInt(page)
        })
        res.status(StatusCodes.OK).json({
            Posts,
            count: Posts.length,
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: parseInt(page)
        });

    } catch (error) {
        console.log(error);
    }
};

getAllPosts({ query: 'Post 2', page: 1, limit: 10 })

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
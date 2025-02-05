const Post = require('../models/post');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/api-error');

const createPost = async (req, res, next) => {
    const { body: { body, title } } = req;
    try {
        const post = await Post.create({ title, body });
        res.status(StatusCodes.CREATED).json({ post });
    } catch (error) {
        next(new ApiError('Post creation failed', StatusCodes.INTERNAL_SERVER_ERROR, error.message, false));
    }
};

const updatePost = async (req, res, next) => {
    const { body: { body, title }, params: { id: PostId } } = req;
    try {
        const post = await Post.findByIdAndUpdate(PostId, { title, body }, { new: true, runValidators: true });
        if (!post) {
            throw new ApiError(`No post found with id ${PostId}`, StatusCodes.NOT_FOUND, 'Post not found', true);
        }
        res.status(StatusCodes.OK).json({ post });
    } catch (error) {
        next(error);
    }
};

const getPost = async (req, res, next) => {
    const { params: { id: PostId } } = req;
    try {
        const post = await Post.findOne({ _id: PostId });
        if (!post) {
            throw new ApiError(`No post found with id ${PostId}`, StatusCodes.NOT_FOUND, 'Post not found', true);
        }
        res.status(StatusCodes.OK).json({ post });
    } catch (error) {
        next(error);
    }
};

const summarizePost = async (req, res, next) => {
    const { summarize } = require('../services/summarize');
    const { query: { service }, params: { id: PostId } } = req;
    try {
        const post = await Post.findOne({ _id: PostId });
        if (!post) {
            throw new ApiError(`No post found with id ${PostId}`, StatusCodes.NOT_FOUND, 'Post not found', true);
        }
        const summary = await summarize(post.body, service);
        res.status(StatusCodes.OK).json({ summary });
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const { query, page = 1, limit = 10 } = req.query;

        const searchQuery = query ? { title: { $regex: query, $options: "i" } } : {};

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const Posts = await Post.find(searchQuery).skip(skip).limit(parseInt(limit));

        const totalPosts = await Post.countDocuments(searchQuery);

        res.status(StatusCodes.OK).json({
            Posts,
            count: Posts.length,
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: parseInt(page)
        });

    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    const { params: { id: PostId } } = req;
    try {
        const post = await Post.findByIdAndDelete({ _id: PostId });
        if (!post) {
            throw new ApiError(`No post found with id ${PostId}`, StatusCodes.NOT_FOUND, 'Post not found', true);
        }
        res.status(StatusCodes.OK).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost,
    updatePost,
    summarizePost,
    deletePost,
    getAllPosts,
    getPost,
};
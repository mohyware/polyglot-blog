const Post = require('../models/post');
const { StatusCodes } = require('http-status-codes');
const summarize = require('../services/summarize');
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
    const { params: { id: PostId } } = req;
    try {
        const post = await Post.findOne({ _id: PostId });
        if (!post) {
            throw new ApiError(`No post found with id ${PostId}`, StatusCodes.NOT_FOUND, 'Post not found', true);
        }
        const summary = await summarize(post.body);
        res.status(StatusCodes.OK).json({ summary });
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const Posts = await Post.find({});
        res.status(StatusCodes.OK).json({ Posts, count: Posts.length });
    } catch (error) {
        next(new ApiError('Failed to retrieve posts', StatusCodes.INTERNAL_SERVER_ERROR, error.message, false));
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
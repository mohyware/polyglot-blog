const Post = require('../models/post');
const { StatusCodes } = require('http-status-codes');
const summarize = require('../services/loadPython');

const createPost = async (req, res) => {
    const { body: { body, title } } = req;
    const post = await Post.create({ title, body });
    res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
    const { body: { body, title }, params: { id: PostId } } = req;
    const post = await Post.findByIdAndUpdate(PostId, { title, body }, { new: true, runValidators: true });
    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: `No post found with id ${PostId}` });
    }
    res.status(StatusCodes.OK).json({ post });
};

const getPost = async (req, res) => {
    const { params: { id: PostId } } = req;
    const post = await Post.findOne({ _id: PostId });
    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: `No post found with id ${PostId}` });
    }
    res.status(StatusCodes.OK).json({ post });
};

const summarizePost = async (req, res) => {
    const { params: { id: PostId } } = req;
    try {
        const post = await Post.findOne({ _id: PostId });
        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `No post found with id ${PostId}` });
        }
        const summary = await summarize(post.body);
        res.status(StatusCodes.OK).json({ summary });
    } catch (error) {
        console.log(error);
    }
};

const getAllPosts = async (req, res) => {
    const Posts = await Post.find({});
    res.status(StatusCodes.OK).json({ Posts, count: Posts.length });
};

const deletePost = async (req, res) => {
    const { params: { id: PostId } } = req;
    const post = await Post.findByIdAndDelete({ _id: PostId });
    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: `No post found with id ${PostId}` });
    }
    res.status(StatusCodes.OK).send();
};

module.exports = {
    createPost,
    updatePost,
    summarizePost,
    deletePost,
    getAllPosts,
    getPost,
};
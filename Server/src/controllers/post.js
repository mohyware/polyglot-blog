import { StatusCodes } from 'http-status-codes';
import Post from '../models/post.js';

const getAllPosts = async (req, res) => {
    const Posts = await Post.find({})
    res.status(StatusCodes.OK).json({ Posts, count: Posts.length })
}

const getPost = async (req, res) => {
    const {
        params: { id: PostId },
    } = req

    const post = await Post.findOne({
        _id: PostId,
    })

    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: `No post found with id ${PostId}` });
    }

    res.status(StatusCodes.OK).json({ post })
}

const createPost = async (req, res) => {
    const {
        body: { body, title }
    } = req
    const post = await Post.create({
        title,
        body
    })

    res.status(StatusCodes.CREATED).json({ post })
}


const updatePost = async (req, res) => {
    const {
        body: { body, title },
        params: { id: PostId },
    } = req

    const post = await Post.findByIdAndUpdate(
        PostId
        , {
            title,
            body
        },
        { new: true, runValidators: true }
    );

    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: `No post found with id ${PostId}` });
    }

    res.status(StatusCodes.OK).json({ post })
}


const deletePost = async (req, res) => {
    const {
        params: { id: PostId },
    } = req

    const post = await Post.findByIdAndDelete({
        _id: PostId,
    })

    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: `No post found with id ${PostId}` });
    }

    res.status(StatusCodes.OK).send()
}



export default {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPost,
}

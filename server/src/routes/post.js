const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

router.route('/').post(postController.createPost).get(postController.getAllPosts);

router.route('/:id').get(postController.getPost).delete(postController.deletePost).patch(postController.updatePost);

router.route('/summary/:id').get(postController.summarizePost);

module.exports = router;
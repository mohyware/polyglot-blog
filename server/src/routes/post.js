const express = require('express');
const router = express.Router();
const postValidationRules = require('../utils/postValidator');
const validateRequest = require('../middlewares/validateRequest');

const postController = require('../controllers/post');

router
    .route('/')
    .post(postValidationRules, validateRequest, postController.createPost)
    .get(postController.getAllPosts);

router
    .route('/:id')
    .get(postController.getPost)
    .delete(postController.deletePost)
    .patch(postValidationRules, validateRequest, postController.updatePost);

router.route('/summary/:id').get(postController.summarizePost);

module.exports = router;
import { Router } from 'express'

const router = Router()
import postController from '../controllers/post.js'

router.route('/').post(postController.createPost).get(postController.getAllPosts)

router.route('/:id').get(postController.getPost).delete(postController.deletePost).patch(postController.updatePost)

export default router

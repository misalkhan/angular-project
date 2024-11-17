const express = require('express')
const router = express.Router()
const postController = require('../controllers/post-controller')
const middleware = require('../middleware/user-middleware')


router.post('/create', middleware.authenticateToken, postController.createPost)
router.get('/list', middleware.authenticateToken, postController.getAllPosts)
router.get('/activeUserPosts', middleware.authenticateToken, postController.activeUserPosts)
router.put('/edit-post/:postId', middleware.authenticateToken, postController.updatePost)
router.get('/edit-post/:postId', middleware.authenticateToken, postController.getPost)
router.delete('/delete-post/:postId', middleware.authenticateToken, postController.deletePost)

module.exports = router
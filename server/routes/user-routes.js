const express= require('express')
const router= express.Router()
const middleware= require('../middleware/user-middleware')
const userController= require('../controllers/user-controller')


router.post('/signup', userController.signUp)
router.post('/login', userController.login)
router.get('/userInfo',middleware.authenticateToken, userController.userInfo)
router.put('/userInfo',middleware.authenticateToken, userController.updateInfo)

module.exports= router
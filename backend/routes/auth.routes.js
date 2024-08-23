const { Signup, Login, Logout, checkAuth } = require('../controllers/auth.contoller')
const { protectedRoute } = require('../middleware/protectedRoute')

const router = require('express').Router()

router.post('/signup',Signup)

router.post('/login',Login)

router.post('/logout',Logout)

router.get('/checkAuth',protectedRoute,checkAuth)

module.exports=router
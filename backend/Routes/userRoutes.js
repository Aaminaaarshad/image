const express = require('express')
const router = express.Router()
const {registerUser,loginUser,getUser} = require('../Controller/userController')
const protect = require('../Middleware/authMiddleware')


router.post('/',registerUser)
router.post('/loginUser',loginUser)
router.get('/getUser',protect,getUser)


module.exports = router
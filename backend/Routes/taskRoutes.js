const express = require('express')
const router = express.Router()
const {getAllTasks, getSingleTask, createTask, deleteTask, updateTask} = require('../Controller/taskController')
const protect =require('../Middleware/authMiddleware')


router.get('/getAllTasks', protect, getAllTasks)////alltasks are protected so that every user now gets his own goals
router.get('/getSingleTask/:id',getSingleTask)
router.post('/createTask', protect,createTask)
router.delete('/deleteTask/:id', protect,deleteTask)/////protected
router.patch('/updateTask/:id', protect,updateTask)/////protected

module.exports = router
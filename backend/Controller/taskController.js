const asyncHandler = require('express-async-handler')
const Tasks = require('../Model/taskModel')
const User = require('../Model/userModel')

// ============get all tasks================
const getAllTasks = asyncHandler(async(req,res)=>{
    const tasks = await Tasks.find({user:req.user.id})
    /////req.user is from authmiddleware
    // console.log({user:req.user.id})   ////we are finding user parameter in the taskModel ...if the id in 'user' is equal to req.user.id then find it
    // console.log(tasks)

    if(tasks){
        res.status(200).json(tasks)
    }else{
        res.status(400)
        throw new Error('Task not Found')
    }
})


// =========get single task=========
const getSingleTask = asyncHandler(async(req,res)=>{
    const {id} = req.params

    if(id===undefined){
        res.status(400)
        throw new Error("please provide proper id")
        }  
        const task = await Tasks.findById({_id:id})
        console.log(task)

    if(task){
        res.status(200).json({success:true,message:"Task Found",task})
    }else{
        res.status(400)
        throw new Error('Task not Found')
    }
})


// ==============create task=========
const createTask = asyncHandler(async(req,res)=>{
    if(!req.body.task){
        res.status(400)
        throw new Error("please provide task name")
    }
    const newTask = await Tasks.create({task:req.body.task,user:req.user.id})
    console.log(newTask)
    if(newTask){
        res.status(200).json(newTask)
    }else{
        res.status(400)
        throw new Error("task not created")
    }
})


// =================delete task=================
const deleteTask= asyncHandler(async(req,res)=>{
    const task = await Tasks.findById(req.params.id)
    if(!task){
        res.status(400)
        throw new Error("task not found")
    }
    if(!req.user){
        res.status(401)
        throw new Error("User not found")
    }
    ////confirmation for the user whether it is his task or not
    if(task.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("user not authorized")
    }
    console.log(task.user.toString());

    const deletedTask = await task.deleteOne({user:req.user.id})
    if(deletedTask){
        res.status(200).json({success:true, message:'task deleted',deletedTask })

    }else{
        res.status(400)
        throw new Error('task not deleted')
    }
})


// =================update task======================
const updateTask = asyncHandler(async(req,res)=>{
    const task = await Tasks.findById(req.params.id)
    console.log(task);

    if(!task){
        res.status(400)
        throw new Error("task not found")
    }
    if(!req.user){
        res.status(401)
        throw new Error("User not found")
    }
    if(task.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("user not authorized")

    }
    const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }) 
    // console.log({_id:req.params.id})

    if(updatedTask){
        res.status(200).json({success:true,message:"task updated",updatedTask})
    }else{
        res.status(400)
        throw new Error("task not updated")
    }
})









module.exports = {getAllTasks, getSingleTask, createTask, deleteTask, updateTask}
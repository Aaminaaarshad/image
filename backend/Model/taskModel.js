const mongoose = require('mongoose')
const taskSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    task:{
        type:String,
        required:[true,"Please Provide Task Name"]
    }
},{timestamps:true})


module.exports = mongoose.model('Tasks',taskSchema)
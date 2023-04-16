const express = require('express')
const dotenv = require ('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 5001
const connectDB = require('./DB/DB')
const taskRoutes = require('./Routes/taskRoutes')
const userRoutes = require('./Routes/userRoutes')
const {errorMiddleware} = require('./Middleware/errorMiddleware')
const Img = require('./Model/imageModel')


const app = express()
const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Images')
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload=multer({storage:storage})
app.set('view engine','ejs')

app.post('/api/task/createImage',upload.single('image'),async(req,res)=>{
    try {
        const newImage = await Img.create(req.body)
    console.log(req.body,'bodyyyyy')
    console.log(newImage)
    res.send(newImage)
    } catch (error) {
        console.log(error);
    }
    

})



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/task',taskRoutes)
app.use('/api/user',userRoutes)



app.use(errorMiddleware)

app.get('/',(req,res)=>{
    res.send('server is running')
})

const start=async()=>{
    await connectDB()
    app.listen(PORT ,()=>console.log(`server is listening at port ${PORT}`))
}

start()
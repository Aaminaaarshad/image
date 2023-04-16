const express = require('express')
const dotenv = require ('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 5001
const connectDB = require('./DB/DB')
const taskRoutes = require('./Routes/taskRoutes')
const userRoutes = require('./Routes/userRoutes')
const {errorMiddleware} = require('./Middleware/errorMiddleware')
const ImageModel = require('./Model/imageModel')


const app = express()
app.use(cors())
const path = require('path')
const multer = require('multer')
app.set('view engine','ejs')
app.use('/Images', express.static(path.join(__dirname, 'Images')));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Images')
    },
    filename:(req,file,cb)=>{
        console.log("sss");
        cb(null,Date.now() + path.extname(file.originalname))
    }
})



const upload=multer({storage:storage})

app.post('/api/task/createImage',upload.single('image'),async(req,res)=>{
    try {
    console.log(req.body,'bodyyyyy')

        const {name, description} =  req.body

        if(!name || !description){
            res.send({message:"provide valid input, both name and description"})
        }else{
          
            const newImage = await ImageModel.create({name, description, image:`http://localhost:5000/Images/1681615725799.PNG`})
            res.send({message:"Success", newImage})
        }

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
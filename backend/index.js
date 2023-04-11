const express = require('express')
const dotenv = require ('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 5001
const connectDB = require('./DB/DB')
const taskRoutes = require('./Routes/taskRoutes')
const userRoutes = require('./Routes/userRoutes')
const {errorMiddleware} = require('./Middleware/errorMiddleware')




const app = express()
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
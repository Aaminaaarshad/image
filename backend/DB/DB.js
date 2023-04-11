const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.Mongo_URL).then(()=>console.log('DB is Connected'))
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDB
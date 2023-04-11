const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Model/userModel')



const protect = asyncHandler(async(req,res,next)=>{
    let token
    ////// get token//// 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){     /////Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmIwYT
        try {
            token = req.headers.authorization.split(' ')[1]      /////////eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmIwYT
            const decoded = jwt.verify(token,process.env.JWT_SECRET)    ////{ id: '642b0a3713000f3082f71c66', iat: 1680542263, exp: 1680801463 }

            req.user = await User.findById(decoded.id).select('-password')  ///{_id: new ObjectId("642b0a3713000f3082f71c66"),name: 'moona',email: 'moonaaa@gmail.com',createdAt: 2023-04-03T17:17:43.274Z,updatedAt: 2023-04-03T17:17:43.274Z,__v: 0}
            
            next()
        } catch (error){
            console.log(error);
            res.status(401)
            throw new Error('not authorized')
            
        }
    }
    if(!token){
        res.status(401)
        throw new Error('not authorized no token')


    }
})
module.exports = protect
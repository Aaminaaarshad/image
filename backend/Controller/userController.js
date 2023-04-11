const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../Model/userModel')


// =============================register user===================================================================
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("please provide all fields")
    }
    ////user already exist/////
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("user already registered")
    }
    /////hash password/////
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    console.log(hashedPassword); ///////$2a$10$.JYhSFSxFGQ3LqXsvxHap.Fr/gx4PEVrpIVVSupAXeuluPfCy7H9q
    const registeredUser = await User.create({name, email, password : hashedPassword})
    // console.log(registeredUser); 
    // console.log(registeredUser.id);   ////id: 642b0a3713000f3082f71c66
    // console.log(registeredUser._id);   ////_id: new ObjectId("642b0a3713000f3082f71c66"),

    if(registeredUser){
        res.status(201).json({
            _id:registeredUser.id,
            name:registeredUser.name,
            email:registeredUser.email,
            token:generateToken(registeredUser._id)
        })
    }else{
        res.status(400)
        throw new Error("invalid user data")
    }
})

///=========Authentiacte a user==========
// ====================================login user================================================================================
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    ////check for user email
    const user = await User.findOne({email})
    console.log(user);
    /////check for password match
    if(user && (await bcrypt.compare(password,user.password))){
        console.log((await bcrypt.compare(password,user.password)));
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error("invalid credentials")
    }
})


// ============================================get user data=====================================================================
////access private
const getUser = asyncHandler(async(req,res)=>{
    ///req.user is from authmiddleware because it is protected in userRoutes.js
    res.status(200).json(req.user)
})

//////////////////////////////generate token//////////////////////////////////////////////////
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'3d'})
}



module.exports = {registerUser,loginUser,getUser}
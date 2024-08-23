const User = require('../models/user.model')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { CreateToken } = require('../utils/config')

module.exports.Signup = async(req,res)=>{
   const {username,password,email} = req.body

   if(!username || !password || !email){
      return res.status(400).json({success:false,message:"All fields are required"})
   }

   const validEmail = validator.isEmail(email)
   if(!validEmail) return res.status(400).json({success:false,message:"Email is not valid"})

   if(username.length < 3) return res.status(400).json({success:false,message:"Username must be at least 3 characters"})
  
   const validPassword = validator.isStrongPassword(password)
   if(!validPassword) return res.status(400).json({success:false,message:"Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character"})

   const existingEmail = await User.findOne({email})
   if(existingEmail) return res.status(409).json({success:false,message:"Email already exists"})

   const existingUsername = await User.findOne({username})
   if(existingUsername) return res.status(409).json({success:false,message:"Username already exists"})
    
   const PROFILE_PICS = ['/avatar1.png','/avatar2.png','/avatar3.png']
   const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]
   try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password,salt)

      const user = new User({
         email,
         username,
         password:hash,
         image
      })
      if(user){
         const newUser = await user.save()
         CreateToken(newUser._id,res)
         const {password:userpassword,updatedAt, ...other} = newUser._doc
         res.status(201).json({success:true,user:other})
      }  
   } catch (error) {
      console.log(error)
      res.status(500).json("Internal Server Error")
   }
   
}

module.exports.Login = async(req,res)=>{
   const {email,password} = req.body
   if(!email ||!password) return res.status(400).json({success:false,message:"All fields are required"})
   try {
      const user = await User.findOne({email})
      if(!user) return res.status(404).json({success:false,message:'Invalid credentials'})
      
      const validpassword = await bcrypt.compare(password,user.password)
      if (!validpassword) return res.status(404).json({success:false,message:'Invalid credentials'})

      CreateToken(user._id,res)
      const {password:userpassword,updatedAt, ...other} = user._doc
      res.status(200).json({success:true,user:other})
   
   } catch (error) {
      console.log(error)
      res.status(500).json("Internal Server Error")
   }
}

module.exports.Logout = async(req,res)=>{
    try {
      res.clearCookie("jwt-netflix")
      res.status(200).json({success:'true',message:'Logged out successfully'})
    } catch (error) {
      console.log(error)
      res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

module.exports.checkAuth = (req,res)=>{
   try {
      res.status(200).json({success:true,user:req.user})
   } catch (error) {
      console.log(error)
      res.status(500).json({success:false,message:"Internal Server Error"})
   }
}
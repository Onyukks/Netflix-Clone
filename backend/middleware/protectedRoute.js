const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const env = process.env

const protectedRoute = async(req,res,next)=>{
    try {
        const token = req.cookies['jwt-netflix']

        if(!token){
            return res.status(401).json({success:false,message:"Unauthorized - No token provided"})
        }

        const decoded = jwt.verify(token,env.SECRET)
        if(!decoded){
            return res.status(401).json({success:false,message:"Unauthorized - Invalid token"})
        }

        const user = await User.findById(decoded.userid).select("-password")
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }

        req.user = user
        next()

    } catch (error) {
        
    }
}

module.exports={
    protectedRoute
}
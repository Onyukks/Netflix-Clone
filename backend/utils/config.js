const jwt = require('jsonwebtoken')
const env = process.env

const CreateToken = (userid,res)=>{
    const token = jwt.sign({userid},env.SECRET,{expiresIn:'15d'})

    res.cookie("jwt-netflix",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite : "strict",
        secure: env.NODE_ENV !== 'development'
    })

    return token
}

module.exports={
    CreateToken
}
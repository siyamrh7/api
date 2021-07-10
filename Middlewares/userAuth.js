const Users=require('../Models/AuthModel')
const jwt=require('jsonwebtoken')
const userAuth=async(req,res,next)=>{
    try {const token=req.headers.authorization
        if(!token){return res.send("Invalid Authentication")}
        const {email}=await jwt.verify(token,process.env.JWT_SECRET)
        if(!email){return res.send("Invalid Authentication")}
        const user=await Users.findOne({email})
        req.user=user
        next()
    } catch (error) {
        res.send(error.message)
    }
}
module.exports={userAuth}
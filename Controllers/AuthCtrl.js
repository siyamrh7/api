const Users=require('../Models/AuthModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const signupCtrl=async(req,res)=>{
    try {const {fname,lname,password,email,affiliate,country,cpassword}=req.body
    if(!email || !password || !fname || !lname || !cpassword || !country){return res.send("Invalid Creadentials")}
    const find=await Users.findOne({email})
    if(find){return res.send("User Aleady Exist")}
    const pass=password===cpassword
    if(!pass) {return res.send("Password Didn't Match")}
    const hashpass=await bcrypt.hash(password,10)
    const user=new Users({
        fname,lname,email,country,password:hashpass,affiliate
    })
    await user.save()
    res.send("Signup Success, Now you can login")
    } catch (error) {
        res.send(error.message)
    }
}
const signinCtrl=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){return res.send("Invalid Creadentials")}
        const find=await Users.findOne({email})
        if(!find){return res.send ("User Doesn't Exist")}
        const cheak=await bcrypt.compare(password,find.password)
        if(!cheak){return res.send("Inavlid Password")}
        const token=await jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.send("Login Successful")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports={signupCtrl,signinCtrl}
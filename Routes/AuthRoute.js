const router=require('express').Router()
const {signupCtrl,signinCtrl}=require('../Controllers/AuthCtrl')
const {userAuth}=require("../Middlewares/userAuth")
router.get('/',(req,res)=>{
    res.send("server is running")
})
router.post('/signup',signupCtrl)
router.post('/signin',signinCtrl)
router.get('/user',userAuth,(req,res)=>{
    res.send(req.user)
})
module.exports=router;
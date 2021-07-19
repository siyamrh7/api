const Users = require("../Models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupCtrl = async (req, res) => {
  try {
    const { fname, lname, password, email, affiliate, country, cpassword } =
      req.body;
    if (!email || !password || !fname || !lname || !cpassword || !country) {
      return res.json({msg:"Invalid Creadentials"});
    }
    const find = await Users.findOne({ email });
    if (find) {
      return res.json({msg:"User Aleady Exist"});
    }
    const pass = password === cpassword;
    if (!pass) {
      return res.json({msg:"Password Didn't Match"});
    }
    const hashpass = await bcrypt.hash(password, 10);
    const user = new Users({
      fname,
      lname,
      email,
      country,
      password: hashpass,
      affiliate,
    });
    await user.save();
    res.json({msg:"Signup Success, Now you can login"});
  } catch (error) {
    res.json({msg:error.message});
  }
};
const signinCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({msg:"Invalid Creadentials"});
    }
    const find = await Users.findOne({ email });
    if (!find) {
      return res.json({msg:"User Doesn't Exist"});
    }
    const cheak = await bcrypt.compare(password, find.password);
    if (!cheak) {
      return res.json({msg:"Inavlid Password"});
    }
    const token = await jwt.sign({ id:find._id }, process.env.JWT_SECRET, {
      expiresIn:'7d',
    });
    res.json({token,msg:"Login Successfull"});
  } catch (error) {
    res.json({msg:error.message});
  }
};
const singleUser=async(req,res)=>{
  try {
    
    const user=await Users.findOne({_id:req.user._id}).populate("orders")
    res.json({user})
  } catch (error) {
    res.json({msg:error.message})
  }
}
const getUsers=async(req,res)=>{
  try {
 const users=await Users.find({}).sort("-createdAt")
    res.json({users})
  } catch (error) {
    res.json({msg:error.message})
  }
}
const deleteUser=async(req,res)=>{
  try {
    const {id}=req.params
    await Users.findByIdAndDelete(id)
    res.json({msg:"User Deleted Successfully"})
  } catch (error) {
    res.json({msg:error.message})
  }
}
const editUser=async(req,res)=>{
  try {
    const {id}=req.params
    await Users.findByIdAndUpdate(id,{
      ...req.body
    })
    res.json({msg:"Updated Successfully"})
  } catch (error) {
    res.json({msg:error.message})
  }
}
module.exports = { signupCtrl, signinCtrl ,singleUser,getUsers,deleteUser,editUser};

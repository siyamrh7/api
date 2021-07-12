const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    affiliate:{
        type:String
    },
    role:{
        type:String,
        default:"admin"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Users=mongoose.model('Users',userSchema)
module.exports=Users
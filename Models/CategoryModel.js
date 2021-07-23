const mongoose=require('mongoose')
const categorySchema=new mongoose.Schema({
    category:{
        type:String,
        unique:true,
        required:true
    }
})
const Categories=mongoose.model("Categories",categorySchema)
module.exports=Categories

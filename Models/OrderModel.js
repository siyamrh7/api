const mongoose= require('mongoose')

const orderSchema=new mongoose.Schema({
    product:{
        type:Object,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    }

},{
    timestamps:true
})

const Orders=mongoose.model('Orders',orderSchema)

module.exports=Orders
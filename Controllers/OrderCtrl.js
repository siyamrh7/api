const Orders=require('../Models/OrderModel')
const Users=require('../Models/AuthModel')


const orderCreate=async(req,res)=>{
    try {const {product}=req.body
        const order=new Orders({
            product,user:req.user._id
        })
        const orders=await order.save()
        await Users.findByIdAndUpdate({_id:req.user._id},{
            $push:{
                orders:orders._id
            }
        })
        res.json({msg:"order successful"})
    } catch (error) {
        res.json({msg:error.message})
    }
}
const getOrders=async(req,res)=>{
    try {
        const orders=await Orders.find({}).sort("createdAt").populate("user","-orders")
        res.json({orders})
    } catch (error) {
        res.json({msg:error.message})
    }
}
const deleteOrder=async(req,res)=>{
    try {
        const {id}=req.params
        await Orders.findByIdAndDelete(id)
        res.json({msg:"Order Deleted Successfully"})
    } catch (error) {
        res.json({msg:error.message})
    }
}
const singleOrder=async(req,res)=>{
    try {
        const {id}=req.params
        const order=await Orders.findOne({_id:id}).populate("user","-orders")
      res.json({order})
    } catch (error) {
        res.json({msg:error.message})
    }
}

module.exports={orderCreate,getOrders,deleteOrder,singleOrder}
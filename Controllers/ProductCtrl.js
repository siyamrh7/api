const Products=require('../Models/ProductModel')
const createProduct=async(req,res)=>{
    try {
        const {name,images,price}=req.body
        if(!name || !price || !images){return res.send("Please enter required filled")}
        const product=new Products({
            ...req.body
        })
      const prod=await product.save()
      res.send(prod)
    } catch (error) {
        res.send(error.message)
    }
}

const getProducts=async(req,res)=>{
    try {
        const products=await Products.find({}).sort('-date')
        res.send(products)
    } catch (error) {
        res.send(error.message)
    }
}
const singleProduct=async(req,res)=>{
    try {
        const product= await Products.findById(req.body.id)
        res.send(product)
    } catch (error) {
        res.send(error.message)
    }
}

module.exports={createProduct,getProducts,singleProduct}
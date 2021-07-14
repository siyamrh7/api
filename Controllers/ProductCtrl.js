const Products = require("../Models/ProductModel");
const createProduct = async (req, res) => {
  try {
    const { name, images, price } = req.body;
    if (!name || !price || !images) {
      return res.send("Please enter required filled");
    }
    const product = new Products({
      ...req.body,
    });
    const prod = await product.save();
    res.send(prod);
  } catch (error) {
    res.send(error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const { price, date ,currency,page,search} = req.query;
   const limit=12
 const skip=limit * page
    
 if(search && currency && price){
  const products=await Products.find({currency:currency,name:{$regex:search,$options:'i'}}).sort(price).limit(12).skip(skip)
  return res.send(products)
}
   if(price && search){
     const products=await Products.find({name:{$regex:search,$options:'i'}}).sort(price).limit(12).skip(skip)
     return res.send(products)
   }
   if(search && currency){
     const products=await Products.find({currency:currency,name:{$regex:search,$options:'i'}}).limit(12).skip(skip)
     return res.send(products)
   }
    if (price && currency) {
      const products = await Products.find({currency}).sort(price).limit(12).skip(skip)
      return res.send(products);
    }
     if(search){
      const products=await Products.find({name:{$regex:search,$options:'i'}}).limit(12).skip(skip)
      return res.send(products)
    }
    if (currency) {
      const products = await Products.find({currency}).limit(12).skip(skip)
      return res.send(products);
    }
    if (price) {
      const products = await Products.find({}).sort(price).limit(12).skip(skip)
      return res.send(products);
    }
    if (date) {
      const products = await Products.find({}).sort(date).limit(12).skip(skip)
      return res.send(products);
    }

      const products = await Products.find({}).sort("-date").limit(12).skip(skip)
      return  res.send(products);
    
  } catch (error) {
    res.send(error.message);
  }
};
const singleProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.send(product);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { createProduct, getProducts, singleProduct };

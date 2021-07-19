const Products = require("../Models/ProductModel");
const createProduct = async (req, res) => {
  try {
    const { name, images, price } = req.body;
    if (!name || !price || !images) {
      return res.json({msg:"Please enter required filled"});
    }
    const product = new Products({
      ...req.body,
    });
    const prod = await product.save();
    res.json({msg:`Product ${prod.name} Created`});
  } catch (error) {
    res.send(error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const { price, createdAt, currency, page, search } = req.query;
    const limit = 12;
    const skip = limit * page;

    if (search && currency && price) {
      const count = await Products.find({
        currency: currency,
        name: { $regex: search, $options: "i" },
      }).countDocuments();
      const products = await Products.find({
        currency: currency,
        name: { $regex: search, $options: "i" },
      })
        .sort(price)
        .limit(12)
        .skip(skip);
      return res.json({ products, count });
    }
    if (price && search) {
      const count = await Products.find({
        name: { $regex: search, $options: "i" },
      }).countDocuments();
      const products = await Products.find({
        name: { $regex: search, $options: "i" },
      })
        .sort(price)
        .limit(12)
        .skip(skip);
      return res.json({ products, count });
    }
    if (search && currency) {
      const count = await Products.find({
        currency: currency,
        name: { $regex: search, $options: "i" },
      }).countDocuments();
      const products = await Products.find({
        currency: currency,
        name: { $regex: search, $options: "i" },
      })
        .limit(12)
        .skip(skip);
      return res.json({ products, count });
    }
    if (price && currency) {
      const count = await Products.find({ currency }).countDocuments();
      const products = await Products.find({ currency })
        .sort(price)
        .limit(12)
        .skip(skip);
      return res.json({ products, count });
    }
    if (createdAt && currency) {
      const count = await Products.find({ currency }).countDocuments();
      const products = await Products.find({ currency })
        .sort(createdAt)
        .limit(12)
        .skip(skip);
      return res.json({ products, count });
    }
    if (createdAt && search) {
      const count = await Products.find({ search }).countDocuments();
      const products = await Products.find({ search })
        .sort(createdAt)
        .limit(12)
        .skip(skip);
      return res.json({ products, count });
    }
    if (search) {
      const count = await Products.find({
        name: { $regex: search, $options: "i" },
      }).countDocuments();
      const products = await Products.find({
        name: { $regex: search, $options: "i" },
      })
        .limit(12)
        .skip(skip);
      return res.json({ products, count });
    }
    if (currency) {
      const count = await Products.find({ currency }).countDocuments();
      const products = await Products.find({ currency }).limit(12).skip(skip);
      return res.json({ products, count });
    }
    if (price) {
      const count = await Products.find({}).countDocuments();
      const products = await Products.find({}).sort(price).limit(12).skip(skip);
      return res.json({ products, count });
    }
    if (createdAt) {
      const count = await Products.find({}).countDocuments();
      const products = await Products.find({}).sort(createdAt).limit(12).skip(skip);
      return res.json({ products, count });
    }
    const count = await Products.find({}).countDocuments();
    const products = await Products.find({}).sort("-createdAt").limit(12).skip(skip);
    return res.json({ products, count });
  } catch (error) {
    res.send(error.message);
  }
};
const singleProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.json({product});
  } catch (error) {
    res.json({msg:error.message});
  }
};
const editProduct=async(req,res)=>{
  try {
    const {id}=req.params
    
    const product=await Products.findByIdAndUpdate(id,{
      ...req.body
    },{new:true})
    res.json({product})
  } catch (error) {
    res.json({msg:error.message})
  }
}
const deleteProduct=async(req,res)=>{
  try {
    const {id}=req.params
    const product=await Products.findByIdAndDelete(id)
    res.json({msg:`${product.name} deleted Successfully`})
  } catch (error) {
    res.json({msg:error.message})
  }
}

module.exports = { createProduct, getProducts, singleProduct,editProduct ,deleteProduct};

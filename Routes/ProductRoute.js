const router=require('express').Router()
const {createProduct,getProducts,singleProduct}=require('../Controllers/ProductCtrl')

router.post('/product',createProduct)
router.get('/products',getProducts)
router.get('/product/:id',singleProduct)

module.exports=router
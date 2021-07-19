const router=require('express').Router()
const {orderCreate,getOrders,singleOrder,deleteOrder}=require('../Controllers/OrderCtrl')
const {userAuth,adminAuth}=require('../Middlewares/userAuth')
router.post('/order',userAuth,orderCreate)
router.get('/orders',getOrders)
router.get('/order/:id',singleOrder)
router.delete('/order/:id',deleteOrder)

module.exports=router



const express=require("express");
const route=express.Router();
const {auth}=require('../middlewares/auth')
const {postAdd,viewProduct,postProduct,home}=require('../controllers/postProductController');

route.get("/postProduct",auth,postAdd)
route.post("/postProduct",auth,postProduct)

route.get("/viewProduct",auth,viewProduct)
route.get("/",home)
module.exports=route
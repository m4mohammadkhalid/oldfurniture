const express=require("express")
const route=express.Router();
const {sellproduct,selluserproduct}=require("../controllers/sellproductController");


route.post('/sellproduct',sellproduct)
route.get('/selluserproduct',selluserproduct)


module.exports=route;
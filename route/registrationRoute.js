const express=require('express');
const route=express.Router();
const {auth,stopauth}=require('../middlewares/auth')
const {login,postLogin,register,registervalidation1,registervalidation2,loginvalidation,logout,contact,product,sellproduct,allcategories,productfullView,contactsend,contactView}=require('../controllers/registrationController')

//Home Only Work


route.get("/contact",contact)
route.get("/product",product)
route.get("/sellproduct",sellproduct)
route.get("/allcategories",allcategories) 
route.get("/productfullView/:id",productfullView)




// end home page work

route.get("/form",(request,response)=>{
    response.render('./adminPage/form');
})


route.post("/contact",contactsend)
route.get("/contactView",contactView)


route.get("/admin",stopauth,login)

route.get("/logout",logout)

route.get("/register",register)

route.post('/register',registervalidation1,registervalidation2)

route.post('/postLogin',loginvalidation,postLogin)




module.exports=route;
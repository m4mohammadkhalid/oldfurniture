const users=require('../models/user')
const formidable = require('formidable');

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { request } = require('express');
//const Users = require('../models/user')
const Posts = require('../models/post')
const Contact = require('../models/contact')








const logout=(request,response)=>{
    request.session.destroy()
    response.redirect('/admin')
}
const login=(request,response)=>{
    response.render('./adminPage/login',{errors:[],inputs:{},login:false});
}
const loginvalidation=[
    check('email').not().isEmpty().withMessage('Email Require'),
    check('password').not().isEmpty().withMessage('Password Require')
]
const postLogin=async(request,response)=>{
    const {email,password}=request.body;
    const errors = validationResult(request);
        if(!errors.isEmpty()){
            response.render('./adminPage/login',{errors:errors.array(),inputs:request.body,login:false});
        }else{
            const emailCheck=await users.findOne({email})
            if(emailCheck !== null){
                const id=emailCheck._id;
                const dbpassword=emailCheck.password;
                const passwordverify=await bcrypt.compare(password,dbpassword)
                if(passwordverify){
                    const token=jwt.sign({userID:id},process.env.JWT_SECRET,{
                        expiresIn:"7d"
                    })
                    console.log("usertoken: ",token)
                    request.session.userz=token;
                    response.redirect("/dashboard")
                }else{
                    response.render('./adminPage/login',{errors:[{msg:'Your Password Wrong'}],inputs:request.body,login:false});
                }
            }else{
            response.render('./adminPage/login',{errors:[{msg:'Email Not Found'}],inputs:request.body,login:false});

            }
        }
}
const register=(request,response)=>{
    response.render('./adminPage/register',{ errors:[], inputs:{}, login:false });
}
const registervalidation1=[
    check('fname').not().isEmpty().trim().escape().withMessage('Please Enter First Name'),
    check('lname').not().isEmpty().trim().escape().withMessage('Please Enter Last Name'),
    check('email').isEmail().withMessage('Please Enter Email'),
    check('password').isLength({ min: 5 }).withMessage('please Enter Password'),
]

const registervalidation2=async (request,response)=>{
    const {fname,lname,email,password}=request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
       response.render("./adminPage/register",{errors:errors.array(),inputs:request.body,login:false})
         }else{
            try{
                const emailuser= await users.findOne({email});
                if(emailuser === null){
                        const salt= await bcrypt.genSalt(10);
                        const hash=await bcrypt.hash(password,salt)
                        const newuser=new users({
                            fname:fname,
                            lname:lname,
                            email:email,
                            password:hash
                        });
                        try{
                         const cheack=  await newuser.save()
                            request.flash('success','your account create successfully')
                            response.redirect('/login')
                        }catch(error){
                            console.log(error.message)
                        }
                }else{
                   response.render("./adminPage/register",{errors:[{msg:'Email alredy use'}],inputs:request.body,login:false})
                }
            }catch(error){
                console.log(error.message)
            }
         }  
}

const contact=(request,response)=>{
    response.render('./homePage/contact');
}

const product=(request,response)=>{
    response.render('./homePage/product');
}

const sellproduct=(request,response)=>{
    response.render('./homePage/sellproduct');
}

const allcategories=(request,response)=>{
    response.render('./homePage/allcategories' );
}

const productfullView=async(request,response)=>{
    const id=request.params.id;
    const details= await Posts.findOne({_id:id});
    response.render('./homePage/productfullView',{details});
} 

const contactsend=(request,response)=>{
    var myData = new Contact(request.body);
       myData.save()
    .then(item => {
        request.flash('success','your Post Create successfully')
        response.redirect("/contact")
    })
    .catch(err => {
      response.status(400).send("unable to save to database");
    });
}

const contactView=(request,response)=>{
    response.render("./adminPage/contactView")
}

module.exports={
    
    login,
    postLogin,
    register,
    registervalidation1,
    loginvalidation,
    registervalidation2,
    logout,
    contact,
    product,
    sellproduct,
    allcategories,
    productfullView,
    contactsend,
    contactView
}
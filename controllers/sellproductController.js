const { request, response } = require("express");

const formidable = require('formidable');
const Posts=require("../models/sellproduct")
const fs=require('fs');
const { v4: uuidv4 } = require('uuid');

const sellproduct=(request,response)=>{
    const form = formidable({ multiples: true });
    form.parse(request, (err, fields, files) => {
        const errors=[]
        const {name,number,detail}=fields;
        if(name.length===0){
            errors.push({msg:'Please Insert Product Name'})
        }
        if(number.length===0){
            errors.push({msg:'Please Insert Your Mobile Number'})
        }
        if(detail.length===0){
            errors.push({msg:'Please Insert Product Details'})
        }
        
        const imageName=files.image.name;
        const split=imageName.split(".");
        const imageExt=split[split.length-1].toUpperCase();
        if(files.image.name.length===0){
            errors.push({msg:'Please Upload Image'})
        } else if(imageExt !== "JPG" && imageExt !== "PNG"){
            errors.push({msg:'only jpg and png allows'})
        }
        if(errors.length !== 0){
            response.render("./homePage/sellProduct",{errors,name,number,detail})   
        }else{
            files.image.name=uuidv4()+"."+imageExt;
            const oldPath=files.image.path
            const newPath= __dirname + "/../views/assets/img2/" + files.image.name;
            fs.readFile(oldPath,(err,data)=>{
                if(!err){
                    fs.writeFile(newPath,data,(err)=>{
                        if(!err){
                            fs.unlink(oldPath, async(err)=>{
                                if(!err){
                                    const id=request.id;
                                    try{
                                        const newPost= new Posts({
                                            name,
                                            number,
                                            detail,
                                            image:files.image.name,
                                        })
                                        try{
                                            const result= await newPost.save();
                                            if(result){
                                                request.flash('success','your Post Create successfully')
                                                response.redirect("/sellproduct")
                                            }
                                        }catch(errors){
                                            response.send(errors.message)
                                        }
                                    }catch(errors){
                                        response.send(errors.message)
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
      });

}
const selluserproduct=async(request,response)=>{
    const id= request.id
    const allposts=await Posts.find({userID:id}).sort({updatedAt: -1});
    response.render("./adminPage/viewuserProduct",{login:true, posts:allposts})
}
module.exports={
    sellproduct,
    selluserproduct
}
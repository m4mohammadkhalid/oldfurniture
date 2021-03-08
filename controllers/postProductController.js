const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs=require('fs');
const Users = require('../models/user')
const Posts = require('../models/post')


const postAdd=(request,response)=>{
    response.render("./adminPage/postProduct",{login:true, errors:[],title:"",number:"",detail:""})
}

const postProduct=(request,response)=>{
    const form = formidable({ multiples: true });
    form.parse(request, (err, fields, files) => {
        const errors=[]
        const {title,number,detail,money}=fields;
        if(title.length===0){
            errors.push({msg:'Please Insert Product Name'})
        }
        if(number.length===0){
            errors.push({msg:'Please Insert Your Mobile Number'})
        }
        if(detail.length===0){
            errors.push({msg:'Please Insert Product Details'})
        }
        if(money.length===0){
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
            response.render("./adminPage/postProduct",{login:true, errors,title,number,detail,money})   
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
                                        const userz=await Users.findOne({_id: id})
                                        const name=userz.fname;
                                        console.log(name)
                                        const newPost= new Posts({
                                            userID:id,
                                            title,
                                            number,
                                            detail,
                                            money,
                                            image:files.image.name,
                                            userName:name
                                        })
                                        try{
                                            const result= await newPost.save();
                                            if(result){
                                                request.flash('success','your Post Create successfully')
                                                response.redirect("/viewProduct")
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

const viewProduct=async(request,response)=>{
    const id= request.id
    const allposts=await Posts.find({userID:id}).sort({updatedAt: -1});
    response.render("./adminPage/viewProduct",{login:true, posts:allposts})
}

const home=(request,response)=>{
    const allposts=Posts.find({},(err, allposts)=> {
        if (err) {
            console.log(err);
        } else {
            response.render('./homePage/index',{posts:allposts});
        }
    }).sort({updatedAt: -1});
}


module.exports={
    postAdd,
    viewProduct,
    postProduct,
    home
}
const jwt = require('jsonwebtoken');


const auth=(request,response,next)=>{
    if(request.session.userz){
        const token=request.session.userz;
        const verify=jwt.verify(token,process.env.JWT_SECRET)
        if(!verify){
            return response.redirect('/dashboard')
        }else{
            request.id =verify.userID;
        }

    }else{
        return  response.redirect('/admin')
    }
    next();
}

const stopauth =(request,response,next)=>{
    if(request.session.userz){
        const token=request.session.userz;
        const verify=jwt.verify(token,process.env.JWT_SECRET)
        if(verify){
           return response.redirect('/dashboard')
        }
    }
    next();
}


module.exports={
    auth,
    stopauth
}
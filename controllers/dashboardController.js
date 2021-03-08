


const dashboard=(request,response)=>{
    response.render('./adminPage/dashboard',{login:true});
}

module.exports={
    dashboard,
}
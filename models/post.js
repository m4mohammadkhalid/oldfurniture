const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({

    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'registrations'
    },
    title:  {
        type: String,
        require:true
    },
    number: {
        type: String,
        require:true
    },
    image: {
        type: String,
        require:true
    },
    detail: {
        type: String,
        require:true
    },
    money: {
        type: String,
        require:true
    },
    userName:{
        type: String,
        require:true
    }
},{timestamps:true});

const Blog = mongoose.model('postProduct', blogSchema);

module.exports = Blog;
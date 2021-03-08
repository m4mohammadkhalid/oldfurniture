const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({

    name:  {
        type: String,
        require:true
    },
    number: {
        type: String,
        require:true
    },
    detail: {
        type: String,
        require:true
    }
},{timestamps:true});

const Blog = mongoose.model('contact', blogSchema);

module.exports = Blog;
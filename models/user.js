


const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    fname:  { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password:  { type: String, required: true }
  },{timestamps:true});

  const Blog = mongoose.model('registration', blogSchema);

module.exports=Blog
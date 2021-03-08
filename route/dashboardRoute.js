const express=require('express')
const route=express.Router();
const {auth,stopauth}=require('../middlewares/auth')
const {dashboard}=require('../controllers/dashboardController');


route.get("/dashboard",auth,dashboard)

module.exports =route;
const express=require("express");
const ejs = require('ejs');
const path=require("path");
const route=require('./route/registrationRoute')
const route2=require('./route/dashboardRoute')
const route3=require('./route/postProductRoute')
const route4=require('./route/sellProductRoute')


const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('express-flash')
require('dotenv').config()
const connect=require('./models/db');
const PORT=process.env.PORT || 8000;
const { response } = require("express");
const { connection } = require("mongoose");
const index=express();

connect();
const store=new MongoDBStore({
  uri:process.env.DB,
  collection:'sessions'
})
index.use(session({
    secret: process.env.SECRET_KET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store
  }));
index.use(flash())
index.use((request, response,next)=>{
        response.locals.message=request.flash()
        next();
})

index.use(express.urlencoded({extended:true}));
index.use(route);
index.use(route2);
index.use(route3);
index.use(route4);

index.set('view engine', 'ejs');
index.use(express.static(path.join(__dirname, 'views')));
index.listen(PORT,()=>{
    console.log('server strat');
})
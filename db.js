const mongoose=require('mongoose');
var mongoURL='mongodb+srv://irfat:aminirfat@cluster0.h6diglc.mongodb.net/mern-rooms'
mongoose.connect(mongoURL,{useUnifiedtopology:true})
var connection=mongoose.connection
connection.on('error',()=>{
    console.log('mongoDB connection failed')
})

connection.on('connected',()=>{
    console.log('mongodb connection successful')
})

module.exports=mongoose
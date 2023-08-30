const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors')
const roomsRoute=require('./routes/roomsRoute')
const dbConfig=require('./db')
const usersRoute=require('./routes/usersRoute')
const bookingsRoute=require('./routes/bookingsRoute')

app.use(cors())
app.use(express.json())
app.use('/api/rooms' , roomsRoute)
app.use('/api/users' , usersRoute)
app.use('/api/bookings',bookingsRoute)

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log('node server'));
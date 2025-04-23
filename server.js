import express from 'express';
import fs from 'fs';
import User from './models/user.js';
import UserRoutes from './routes/userRoutes.js';
const PORT = 3000;

const app = express(); // to use express



app.use(express.json()); // Handle all incoming JSON Request 

// Creating middleware for routes 
app.use('/api/users',UserRoutes  );


app.listen(PORT, ()=>{
    console.log(`server listening on post ${PORT}`)
})
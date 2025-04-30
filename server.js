import express from 'express';
import fs from 'fs';
import User from './models/user.js';
import UserRoutes from './routes/userRoutes.js';

import path from 'path';
import { error } from 'console';


const PORT = 3000;

const app = express(); // to use express

app.set('view engine', 'ejs');//Tell Express we're using EJS

app.set('views', path.join(path.resolve(), 'views'))//Set views directory


app.use(express.urlencoded({
    extended:true//from parsing
}))


app.use(express.json()); // Handle all incoming JSON Request 

// Creating middleware for routes 
app.use('/api',UserRoutes  );



// Frontend routes for rending 
app.get('/login',(req, res)=>{
    res.render('login', {error:null})
})

app.get('/', (req, res) => {
    res.redirect('/api/register'); // ✅ Correct redirect to your register page
});



app.listen(PORT, ()=>{
    console.log(`server listening on post ${PORT}`)
})
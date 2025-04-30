import User from "../models/user.js";
import express from 'express';
import jwt from 'jsonwebtoken';

import authenticatetoken from "../middleware/auth.js";

const routes = express.Router();

routes.get('/users', (req, res)=>{
    const users = User.allUsers();
    res.json(users);
});

const SECRET_KEY = '007078ac9dcd3112f3fa3dd4e5c1a1551a5aa912d7b4d24133fcf6b3164da10719331a4aab56e49c06799c566874ec749e69751bc4204f773e20d672f9c96d91fc3c36303372eeb056d504c3446617f05d2e985085f01afd4d33b0b1335429a4aee84ab64edc662606f255db1df4135043ae0f712329e2fdf0033e6d2b2aa1edb24c83469e67bd7a0de654b465d19a14c566e1139fc654aa7a2b6746e67ef509dd3b0f794220564f9a923d9b85d235051d3f289b95045851e8f2891532006fe0f58c6bd469fb362812dfee364254d8f06aa6e184a0792ab761c91df57f812f8965b7abeabfd3fd655e895f3a629941ff8db2207ceae624ecd807e4e86557cf4c';

routes.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    try {
        const sendData = User.addUser(name, email, password);

        // After registration success, redirect to login page
        res.redirect('/login');
    } catch (error) {
        console.log("Registration failed:", error.message);

        // On error, redirect back to register page
        res.redirect('/register');
    }
});




routes.post('/login', (req, res)=>{
    const {email, password} = req.body;

    const users = User.allUsers();
    const user = users.find(u=>u.email===email && u.password===password);

    if(!user){
        return res.status(401).json({
            message:'Invalid email or password'
        })
    }


    const token = jwt.sign(
        {email:user.email},
        SECRET_KEY,
        {expiresIn:'1h'}
    );


    res.json({
        message:'Login Successful',
        token:token
    })
})


routes.post('/sendData', authenticatetoken, (req, res)=>{
    const {name, email, password} = req.body; //Get Data from request
    
    try {
        const sendData = User.addUser(name, email, password);

        console.log('test')
        res.status(201).json({
            message:'User added successfully', user: sendData,
            token:token
        })
    } catch (error) {
        console.error('What is happing ')
        res.status(400).json({message:error.message});
    }
})


// Login and signup request

routes.post('/login', (req, res)=>{
    res.redirect('/dashboard')
})

routes.post('/register', (req, res)=>{
    const {name, email, password} = req.body;

    try {
        
    } catch (error) {
        
    }
})

export default routes;
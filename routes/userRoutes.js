import User from "../models/user.js";
import express from 'express';

const routes = express.Router();

routes.get('/users', (req, res)=>{
    const users = User.allUsers();
    res.json(users);
});

export default routes;
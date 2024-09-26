import express from "express";
import { login, register } from "../controllers/user.controller.js";
const userRoute = express.Router();

userRoute.get('/register', register);
userRoute.get('/login', login);


export default userRoute;
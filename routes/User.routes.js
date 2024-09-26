import express from "express";
import {
  deleteUser,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/logout", logout);

userRoute.delete("/users/:id", deleteUser);

export default userRoute;

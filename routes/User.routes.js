import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  logout,
  register,
  updateUser,
  updateUserRole,
} from "../controllers/user.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/logout", logout);

userRoute.get("/users", verifyToken, getAllUsers);
userRoute.delete("/users/:id", verifyToken, deleteUser);
userRoute.patch("/edit-profile", verifyToken, updateUser);
userRoute.put("/users/:id", verifyToken, updateUserRole);

export default userRoute;

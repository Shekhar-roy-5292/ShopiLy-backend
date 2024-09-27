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

userRoute.get("/users", getAllUsers);
userRoute.delete("/users/:id", deleteUser);
userRoute.patch("/edit-profile", updateUser);
userRoute.put("/users/:id", updateUserRole);

export default userRoute;

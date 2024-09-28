import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";
import generateToken from "../middleware/generateToken.js";

//Register endpoint
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
    next();
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
  // Send verification email
  // sendVerificationEmail(user);
  // Generate JWT token
};

//Login endpoint
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.password = undefined;
    const token = await generateToken(user.id);
    // console.log(token);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      httpOnly: true,
      secure: true,
      samesite: true,
      // domain: "shopily.com", // Replace with your domain name
    });
    res.json({ message: "Logged in successfully", token: token, user: user });
    next();
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
  // Generate JWT token
};

// Logout endpoint
const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

// Get all user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "id email role").sort({ createAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

// Edit or update user
const updateUser = async (req, res) => {
  try {
    const { userId, username, profileImage, bio, profession } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //update profile
    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;
    await user.save();
    res.status(200).send({
      message: "User updated successfully",
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { role });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

export {
  register,
  login,
  logout,
  deleteUser,
  getAllUsers,
  updateUser,
  updateUserRole,
};

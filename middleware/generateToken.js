import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Generate JWT token with user's id and secret key
    // Expires in 1 hour (60 minutes)

    // Sign the token using the secret key and expiration time
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (error) {
    throw new Error("Error generating token: " + error.message);
  }
};
export default generateToken;

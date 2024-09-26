import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(JSON.stringify(decoded));
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(403).json({ message: "Access denied. Invalid token." });
  }
};
export default verifyToken;

import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profileImage: String,
    bio: { type: String, maxlength: 255 },
    profession: String,
  },
  {
    timestamps: true,
  }
);
const User = new model("User", userSchema);

export default User;

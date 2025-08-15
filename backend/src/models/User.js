import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 40, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
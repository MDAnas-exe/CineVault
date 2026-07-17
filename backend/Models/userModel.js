import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add name"] },
    password: { type: String, required: [true, "Please add password"] },
    email: { type: String, required: [true, "Please add email"], unique: true },
  },
  { timestamps: true },
);

export default mongoose.model("user", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // NEW
  // ... other fields (telegram, verification tokens etc.)
}, { timestamps: true });

export default mongoose.model("User", userSchema);

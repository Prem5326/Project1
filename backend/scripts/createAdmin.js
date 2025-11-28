import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/user.model.js";
import bcrypt from "bcrypt";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const password = "StrongAdminPass1!"; // change to secure value
const hashed = await bcrypt.hash(password, 10);

const admin = await User.create({
  name: "Admin",
  email: "admin@example.com",
  password: hashed,
  role: "admin",
  verified: true
});

console.log("Admin created", admin);
process.exit(0);

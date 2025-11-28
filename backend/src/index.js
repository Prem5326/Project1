// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// connect DB (MONGO_URI in .env)
connectDB();

// routes
app.use("/api/auth", authRoutes);
// app.use("/api/docs", docRoutes); // TODO: uncomment when ready

// root
app.get("/", (req, res) => res.send("Auth API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

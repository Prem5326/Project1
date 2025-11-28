// src/middleware/admin.middleware.js
import User from "../models/user.model.js";

const isAdmin = async (req, res, next) => {
  try {
    // req.user is set by your auth middleware (id & email). Fetch full user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    if (user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
    req.userDoc = user; // attach full user doc if needed
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default isAdmin;

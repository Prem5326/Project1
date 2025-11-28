import express from "express";

const router = express.Router();

// Placeholder route
router.get("/", (req, res) => {
  res.json({ message: "Documents endpoint" });
});

export default router;

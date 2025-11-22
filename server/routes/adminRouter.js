import express from "express";
import { loginAdmin } from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/dashboard", protect, admin, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard", admin: req.user });
});

export default router;

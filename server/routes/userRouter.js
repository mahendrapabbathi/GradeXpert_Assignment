import express from "express";
import { getProjects, createProject } from "../controllers/projectController.js";
import upload from "../middleware/upload.js";
import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/authController.js"; // typo fixed
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multiple files: screenshots & demoVideo
const cpUpload = upload.fields([
  { name: "screenshots", maxCount: 5 },
  { name: "demoVideo", maxCount: 1 },
]);

// Project routes
router.get("/projects", getProjects);
router.post("/projects", cpUpload, createProject);

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser); 
router.get("/profile", protect, getProfile);

export default router;

import express from "express";
import upload from "../middleware/upload.js";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/projectController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// Multiple files: screenshots & demoVideo
const cpUpload = upload.fields([
  { name: "screenshot", maxCount: 1 }, // updated
  { name: "demoVideo", maxCount: 1 },
   { name: "profilePic", maxCount: 1 },
]);

router.get("/", getProjects);
router.post("/", protect, cpUpload, createProject);
router.put("/:id", protect,cpUpload, updateProject);      // <-- add :id
router.delete("/:id", protect, deleteProject);

export default router;

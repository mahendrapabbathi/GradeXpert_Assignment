import Project from "../models/projectModel.js";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const createProject = async (req, res) => {
  console.log("req.files:", req.files);
  console.log("req.body:", req.body);

  try {
    // Parse JSON safely
    let data = {};
    try {
      data = JSON.parse(req.body.data);
    } catch {
      return res.status(400).json({ message: "Invalid JSON structure" });
    }

    const { personal, projectInfo } = data;

    // Validate required fields
    if (!personal?.name || !personal?.email) {
      return res.status(400).json({ message: "Personal name and email are required" });
    }
    if (!projectInfo?.title) {
      return res.status(400).json({ message: "Project title is required" });
    }

    // Handle uploaded files and store full URL
    const screenshot = req.files?.screenshot?.[0]
      ? `${BACKEND_URL}/uploads/${req.files.screenshot[0].filename}`
      : "";
    const demoVideo = req.files?.demoVideo?.[0]
      ? `${BACKEND_URL}/uploads/${req.files.demoVideo[0].filename}`
      : "";
    const profilePic = req.files?.profilePic?.[0]
      ? `${BACKEND_URL}/uploads/${req.files.profilePic[0].filename}`
      : "";

    data.projectFiles = {
      screenshot,
      demoVideo,
    };

    if (!data.personal) data.personal = {};
    data.personal.profilePic = profilePic;

    // Create project in DB
    const project = await Project.create(data);

    res.status(201).json(project);
  } catch (err) {
    console.error("Create Project Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    console.error("Get Projects Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Parse JSON data from frontend
    let data = {};
    try {
      data = JSON.parse(req.body.data);
    } catch {
      return res.status(400).json({ message: "Invalid JSON" });
    }

    // Handle uploaded files
    if (!data.projectFiles) data.projectFiles = {};
    if (req.files?.screenshot?.[0]) {
      data.projectFiles.screenshot = `${BACKEND_URL}/uploads/${req.files.screenshot[0].filename}`;
    }
    if (req.files?.demoVideo?.[0]) {
      data.projectFiles.demoVideo = `${BACKEND_URL}/uploads/${req.files.demoVideo[0].filename}`;
    }
    if (!data.personal) data.personal = {};
    if (req.files?.profilePic?.[0]) {
      data.personal.profilePic = `${BACKEND_URL}/uploads/${req.files.profilePic[0].filename}`;
    }

    const project = await Project.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(project);
  } catch (err) {
    console.error("Update Project Error:", err);
    res.status(500).json({ message: "Failed to update project", error: err.message });
  }
};

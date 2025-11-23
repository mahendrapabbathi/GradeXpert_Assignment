import { useState } from "react";
import { User, FileText, GitFork, Award, ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import PersonalDetails from "../components/PersonalDetails";
import ProjectInfo from "../components/ProjectInfo";
import ProjectFiles from "../components/ProjectFiles";
import UploadGuidelines from "../components/UploadGuidelines";
import ProjectDetails from "../components/ProjectDetails";
import Resources from "../components/Resources";
import { useProjects } from "../context/ProjectContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import axios from 'axios'

const SubmitProject = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get project id for edit
  const { addProject, projects, setProjects } = useProjects();

  const [loading, setLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({});
  const [projectInfo, setProjectInfo] = useState({});
  const [projectDetails, setProjectDetails] = useState({
    outcome: "",
    technologies: [],
    teamMembers: [{ name: "", role: "" }],
    role: "",
  });
  const [resources, setResources] = useState({});
  const [screenshot, setScreenshot] = useState([]);
  const [demoVideo, setDemoVideo] = useState(null);

  // Pre-fill form if editing
  useEffect(() => {
    if (id) {
      const project = projects.find(p => p._id === id);
      if (project) {
        setFormData(project.personal || {});
        setProjectInfo(project.projectInfo || {});
        setProjectDetails(project.projectDetails || {
          outcome: "",
          technologies: [],
          teamMembers: [{ name: "", role: "" }]
        });
        setResources(project.resources || {});
        if (project.projectFiles?.screenshot) {
          setScreenshot([project.projectFiles.screenshot]); // existing file URL
        }
        if (project.projectFiles?.demoVideo) {
          setDemoVideo(project.projectFiles.demoVideo); // existing file URL
        }
      }
    }
  }, [id, projects]);

  const handleSubmit = async () => {
  if (!formData.name || !formData.email) {
    toast.error("Please fill Name & Email!");
    return;
  }

  if (!projectInfo.title || !projectInfo.shortDesc) {
    toast.error("Title & Short Description are required!");
    return;
  }

  if (!projectDetails.teamMembers[0].name || !projectDetails.teamMembers[0].role) {
    toast.error("At least 1 team member with name & role required!");
    return;
  }

  if (!resources.github) {
    toast.error("GitHub repository link is required!");
    return;
  }

  setLoading(true);

  try {
    const formDataToSend = new FormData();

    // Preserve existing file URLs if not uploading new files
    const projectFiles = {
      screenshot: typeof screenshot[0] === "string" ? screenshot[0] : "",
      demoVideo: typeof demoVideo === "string" ? demoVideo : "",
    };

    const personalData = {
      ...formData,
      profilePic: typeof formData.profilePic === "string" ? formData.profilePic : "",
    };

    const dataToSend = {
      personal: personalData,
      projectInfo: { ...projectInfo, date: projectInfo.projectDate ? new Date(projectInfo.projectDate) : null },
      projectDetails,
      resources,
      projectFiles,
    };

    formDataToSend.append("data", JSON.stringify(dataToSend));

    // Append new files if uploaded
    if (screenshot.length > 0 && typeof screenshot[0] !== "string") formDataToSend.append("screenshot", screenshot[0]);
    if (demoVideo && typeof demoVideo !== "string") formDataToSend.append("demoVideo", demoVideo);
    if (formData.profilePic && typeof formData.profilePic !== "string") formDataToSend.append("profilePic", formData.profilePic);

    let result;
    if (id) {
      // Edit mode
      result = await axios.put(`http://localhost:5000/api/projects/${id}`, formDataToSend, { withCredentials: true });
      setProjects(prev => prev.map(p => p._id === id ? result.data : p));
      toast.success("Project updated successfully!");
    } else {
      // Create mode
      result = await addProject(formDataToSend);
      toast.success("Project submitted successfully!");
    }

    navigate("/projects");
  } catch (err) {
    console.error("SubmitProject Error:", err);
    toast.error(err.response?.data?.message || "Failed to submit project");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full pt-20 bg-gray-50 min-h-screen">
      {/* ---------- NAVIGATION ---------- */}
      <div className="flex justify-center items-center gap-4 py-6 select-none bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <User className="text-white" size={18} />
          </div>
          <span className="text-sm font-medium text-green-600">Personal Details</span>
        </div>

        <div className="w-16 h-[4px] bg-blue-500"></div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <FileText className="text-white" size={18} />
          </div>
          <span className="text-sm font-medium text-blue-600">Project Details</span>
        </div>
      </div>

      {/* ---------- HERO SECTION ---------- */}
      <div className="max-w-4xl mx-auto my-8">
        <div
          className="rounded-2xl p-8 shadow-lg text-white flex flex-col md:flex-row items-center gap-8"
          style={{ background: "linear-gradient(135deg, #6366F1 0%, #9333EA 50%, #EC4899 100%)" }}
        >
          {/* Left Text */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Share Your Innovation <br />
              <span className="text-blue-200">with the World</span>
            </h1>
            <p className="mt-4 text-lg text-purple-100">
              Tell us about yourself first, then showcase your amazing projects.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <button className="px-5 py-1 bg-gray-800/30 text-white rounded-full flex items-center gap-2 hover:bg-blue-50">
                <Award size={18} /> Get Recognition
              </button>
              <button className="px-5 py-2 bg-gray-800/30 text-white rounded-full flex items-center gap-2 hover:bg-blue-50">
                <User size={18} /> Build Portfolio
              </button>
              <button className="px-5 py-2 bg-gray-800/30 text-white rounded-full flex items-center gap-2 hover:bg-blue-50">
                <ExternalLink size={18} /> Network & Grow
              </button>
            </div>
          </div>

          {/* Right Feature Grid */}
          <div className="grid grid-cols-2 gap-6 w-full md:w-1/2 p-4 rounded-lg bg-gray-800/30">
            {[
              { icon: FileText, label: "Documentation" },
              { icon: GitFork, label: "Source Code" },
              { icon: Award, label: "Achievements" },
              { icon: ExternalLink, label: "Live Demo" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-xl py-4 flex flex-col items-center justify-center backdrop-blur-lg border border-white/20"
              >
                <item.icon size={20} className="mx-auto mb-2" />
                <p className="font-medium text-sm text-white">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- FORM ---------- */}
      <div className="bg-white max-w-4xl mx-auto p-6 shadow-md rounded-md mb-10">
        <PersonalDetails formData={formData} setFormData={setFormData} />
        <ProjectInfo projectInfo={projectInfo} setProjectInfo={setProjectInfo} />
        <ProjectFiles
          screenshot={screenshot}
          setScreenshot={setScreenshot}
          demoVideo={demoVideo}
          setDemoVideo={setDemoVideo}
        />
        <UploadGuidelines />
        <ProjectDetails
          projectDetails={projectDetails}
          setProjectDetails={setProjectDetails}
        />
        <Resources resources={resources} setResources={setResources} />

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            className="px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 shadow hover:opacity-90 cursor-pointer"
          >
            Submit Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitProject;

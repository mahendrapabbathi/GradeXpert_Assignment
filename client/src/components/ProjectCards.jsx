import React from 'react';
import { Calendar, Users, ExternalLink, Github, Notebook, BarChart3, Delete, Edit, DeleteIcon, Trash2, Eye } from "lucide-react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useProjects } from '../context/ProjectContext';

const ProjectCards = ({projects}) => {
  const { setProjects } = useProjects();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/projects/${id}`,
        { withCredentials: true }
      );

      setProjects(prev => prev.filter(project => project._id !== id));
      toast.success(res.data.message || "Project deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete project");
    }
  };

  if (!projects || projects.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No projects found.</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto px-16">
      {projects.filter(Boolean).map((project) => {
        if (!project) return null;

        const projectFiles = project.projectFiles || {};
        const screenshot = typeof projectFiles.screenshot === "string" ? projectFiles.screenshot : "/default.png";
        const resources = project.resources || {};
        const personal = project.personal || {};
        const details = project.projectDetails || {};
        const info = project.projectInfo || {};

        return (
          <div key={project._id} className="rounded-xl shadow-xl overflow-hidden bg-white transition-all">

            {/* Project Image */}
            <div className="relative w-full h-48 bg-gray-200 hover:scale-105 transition-transform duration-500">
              <img
                src={screenshot}
                alt={info.title || "Project Image"}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 text-xs px-3 py-1 text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                {details.technologies?.length > 0 ? details.technologies.join(", ") : "Tech not listed"}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 bg-white">
              <h3 className="font-bold text-lg py-2">
                {info.title || "Untitled Project"}
              </h3>

              <p className="text-gray-500 font-light text-sm mt-2 line-clamp-3">
                {info.shortDesc || "No description available"}
              </p>

              <p className="text-gray-500 mt-3 text-xs line-clamp-2">
                {details.outcome || ""}
              </p>

              {/* Info Row */}
              <div className="flex justify-between text-xs text-gray-500 p-4 mt-4">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar size={16} /> 
                  {info.date ? new Date(info.date).toLocaleDateString() : "N/A"}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Users size={16} /> 
                  {details.teamMembers?.length || 1} {details.teamMembers?.length > 1 ? "members" : "member"}
                </div>
              </div>

              {/* Links */}
              <div className="flex justify-center gap-6 text-gray-500 text-xs py-4">
                {resources.github && (
                  <a href={resources.github} target="_blank" rel="noreferrer">
                    <Github size={35} className="p-2 hover:bg-black hover:text-white rounded transition-all duration-300" />
                  </a>
                )}
                {resources.liveDemo && (
                  <a href={resources.liveDemo} target="_blank" rel="noreferrer">
                    <ExternalLink size={35} className="p-2 hover:bg-blue-700 hover:text-white rounded transition-all duration-300" />
                  </a>
                )}
                {resources.documentation && (
                  <a href={resources.documentation} target="_blank" rel="noreferrer">
                    <Notebook size={35} className="p-2 hover:bg-indigo-700 hover:text-white rounded transition-all duration-300" />
                  </a>
                )}
                {resources.presentation && (
                  <a href={resources.presentation} target="_blank" rel="noreferrer">
                    <BarChart3 size={35} className="p-2 hover:bg-purple-700 hover:text-white rounded transition-all duration-300" />
                  </a>
                )}
              </div>

              <hr className="opacity-10 mt-6" />

              {/* Personal Info */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="w-9 h-9 rounded-full object-cover shadow-xl"
                    src={personal.profilePic || "/defaultProfile.png"}
                    alt={personal.name || "User"}
                  />
                  <div>
                    <p className="font-medium text-[16px] text-black">
                      {personal.name || "Anonymous"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {details.teamMembers?.[0]?.role || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/submit-project/${project._id}`} className="bg-purple-500 rounded-md p-2 text-white cursor-pointer hover:bg-purple-600">
                    <Edit />
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-500 p-2 rounded-md text-white text-sm hover:bg-red-600"
                  >
                    <Trash2 />
                    
                  </button>
                  <Link
                    to={`/projects/${project._id}`}
                    className="flex items-center gap-1 bg-blue-600 p-2 rounded-md cursor-pointer hover:bg-blue-700 text-white text-sm"
                  >
                    <Eye />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCards;

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/projects`, {
        withCredentials: true,
      });

      setProjects(res.data.projects || res.data);
    } catch (err) {
      console.error("Error fetching projects:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load once on app start
  useEffect(() => {
    fetchProjects();
  }, [BACKEND_URL]);

  // Add project
  const addProject = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/projects`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const createdProject = res.data.project;

      // Update instantly
      setProjects((prev) => [createdProject, ...prev]);

      return res.data;
    } catch (err) {
      console.error("Add Project Error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, formData) => {
  try {
    setLoading(true);
    const res = await axios.put(`${BACKEND_URL}/api/projects/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    const updatedProject = res.data;

    // Update the project in state
    setProjects(prev => prev.map(p => p._id === id ? updatedProject : p));

    return updatedProject;
  } catch (err) {
    console.error("Update Project Error:", err.response?.data || err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        addProject,
        setProjects,
        fetchProjects,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);

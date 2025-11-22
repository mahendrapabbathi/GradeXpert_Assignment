import { createContext, useContext, useState, useEffect } from "react";
import { projectData } from "../assets/assets";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAllProjects(projectData);
  }, []);

  const hasMore = visibleCount < allProjects.length;

  const loadMore = () => {
    if (!hasMore || loading) return;

    setLoading(true);

    setTimeout(() => {
      setVisibleCount(prev => prev + 6);
      setLoading(false);
    }, 1000);
  };

  const visibleProjects = allProjects.slice(0, visibleCount);

  return (
    <ProjectContext.Provider
      value={{
        allProjects,
        visibleProjects,
        loadMore,
        loading,
        hasMore
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);

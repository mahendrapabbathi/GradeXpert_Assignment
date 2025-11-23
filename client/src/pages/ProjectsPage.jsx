import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useProjects } from "../context/ProjectContext";
import ProjectCards from "../components/ProjectCards";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";

const ProjectsPage = () => {
  const { projects, fetchProjects } = useProjects();
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const PROJECTS_PER_PAGE = 10;

  // Fetch all projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Initialize visible projects whenever `projects` changes
  useEffect(() => {
    const initialProjects = projects.slice(0, PROJECTS_PER_PAGE);
    setVisibleProjects(initialProjects);
    setHasMore(projects.length > PROJECTS_PER_PAGE);
  }, [projects]);

  // Load more projects
  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    setTimeout(() => {
      setVisibleProjects((prev) => {
        const nextProjects = projects.slice(
          prev.length,
          prev.length + PROJECTS_PER_PAGE
        );
        const updated = [...prev, ...nextProjects];
        setHasMore(updated.length < projects.length);
        return updated;
      });
      setLoading(false);
    }, 500); // optional delay to simulate loading
  };

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200 &&
      !loading &&
      hasMore
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, visibleProjects]);

  // Filter visible projects by search query
  const filteredProjects = visibleProjects
    .filter(Boolean) // remove undefined/null projects
    .filter(
      (project) =>
        project.projectInfo?.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

  return (
    <div className="w-full pt-20">
      {/* Heading */}
      <div className="text-center my-8 flex flex-col gap-4">
        <h1 className="font-bold text-4xl">
          Student <span className="text-blue-600">Projects</span>
        </h1>
        <p className="text-xl text-gray-800 font-light max-w-3xl mx-auto">
          Discover innovative projects created by students around the world.
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between px-20 mx-auto my-6">
        <div className="flex items-center w-[700px] border-gray-300 border rounded-xl px-4 py-1 shadow-sm bg-white">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full outline-none text-md px-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p>
            {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </div>

      {/* Project Cards */}
      <ProjectCards projects={filteredProjects} />

      {/* Loader */}
      {loading && (
        <div className="flex items-center justify-center gap-3 my-8">
          <Loader />
          <p className="text-blue-600 text-lg animate-pulse">
            Loading more amazing projects...
          </p>
        </div>
      )}

      {/* End Message */}
      {!hasMore && !loading && (
        <div className="bg-gray-100 py-2 rounded-lg my-20 mx-auto max-w-sm shadow-sm">
          <p className="text-center text-green-600 text-lg font-medium">
            🎉 You have seen all {projects.length} projects!
          </p>
        </div>
      )}

      <ScrollToTop />
    </div>
  );
};

export default ProjectsPage;

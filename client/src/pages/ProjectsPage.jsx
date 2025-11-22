import { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectContext";
import { Search } from "lucide-react";
import ProjectCards from "../components/ProjectCards";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";

const ProjectsPage = () => {
    const {
        allProjects,
        visibleProjects,
        loadMore,
        loading,
        hasMore,
    } = useProjects();

    const [searchQuery, setSearchQuery] = useState("");

    // 🔍 Filter search
    const filteredProjects = visibleProjects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 📌 No useCallback — simple function
    const handleScroll = () => {
        const bottomReached =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 200;

        if (bottomReached && !loading && hasMore) {
            loadMore();
        }
    };

    // 📌 Add/remove scroll event
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]); // deps required so scroll works correctly

    return (
        <div className="w-full pt-20">

            {/* Header */}
            <div className="text-center my-8 flex flex-col gap-4">
                <h1 className="font-bold text-4xl">
                    Student <span className="text-blue-600">Projects</span>
                </h1>
                <p className="text-xl text-gray-800 font-light max-w-3xl mx-auto">
                    Discover innovative projects created by students around the world.
                </p>
            </div>

            <hr className="opacity-10" />

            {/* Search + count */}
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
                        {filteredProjects.length} of {allProjects.length} projects
                    </p>
                </div>
            </div>

            <hr className="opacity-10" />

            {/* Cards */}
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

            {/* Final message */}
            {!hasMore && !loading && (
                <div className="bg-gray-100 py-2 rounded-lg my-20 mx-auto max-w-sm shadow-sm">
                    <p className="text-center text-green-600 text-lg font-medium">
                        🎉 You have seen all {allProjects.length} projects!
                    </p>
                </div>
            )}

            <ScrollToTop />
        </div>
    );
};

export default ProjectsPage;

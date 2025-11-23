import React from "react";
import { Link } from "react-router-dom";
import ProjectCards from "./ProjectCards";
import { useProjects } from "../context/ProjectContext";

const FeaturedProjects = () => {
    
    const { setProjects } = useProjects(); // ⬅ updated from allProjects

    return (
        <section className="py-20 bg-white">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
                <p className="text-gray-500 mt-2 text-xl">
                    Discover amazing projects from talented students around the world
                </p>

                <Link
                    to="/projects"
                    className="text-blue-600 font-light inline-block mt-3 hover:underline"
                >
                    View all projects →
                </Link>
            </div>

            {/* Cards */}
            <ProjectCards projects={projects} />
        </section>
    );
};

export default FeaturedProjects;

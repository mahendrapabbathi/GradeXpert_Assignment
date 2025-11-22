import React from 'react'
import { Calendar, Users, ExternalLink, Github, Notebook, BarChart3 } from "lucide-react";
import { Link } from 'react-router-dom';

const ProjectCards = ({projects}) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto px-16">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="rounded-xl shadow-xl overflow-hidden bg-white transition-all"
                    >
                        {/* Image */}
                        <div className="relative w-full h-48 bg-gray-200 hover:scale-105 transition-transform duration-500">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <span
                                className={`absolute top-3 right-3 text-xs px-3 py-1 text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-500 `}
                            >
                                {project.tech}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-5 bg-white">
                            <h3 className="font-bold text-lg py-2">{project.title}</h3>
                            <p className="text-gray-500 font-light text-sm mt-2 line-clamp-3">
                                {project.desc}
                            </p>

                            {/* Info Row */}
                            <div className="flex justify-between text-xs text-gray-500 p-4 mt-4">
                                <div className="flex items-center gap-1 text-sm">
                                    <Calendar size={16} /> {project.date}
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <Users size={16} /> {project.members}
                                </div>
                            </div>

                            {/* logos */}

                            <div className="flex justify-center gap-6 text-gray-500 text-xs py-4" >
                                <Github size={35} className="p-2 hover:bg-black rounded transition-all duration-300" />
                                <ExternalLink size={35} className="p-2 hover:bg-blue-700 text-blue-600 hover:text-gray-500 rounded transition-all duration-300" />
                                <Notebook size={35} className="p-2 hover:bg-indigo-700 rounded transition-all duration-300" />
                                <BarChart3 size={35} className="p-2 hover:bg-purple-700 rounded transition-all duration-300" />
                            </div>

                            <hr className="opacity-10 mt-6" />

                            {/* Footer */}
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <div className="shadow-xl">
                                        <img
                                            className="w-9 h-9 rounded-full object-cover "
                                            src={project.profile}
                                            alt="Profile"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[16px] text-black">{project.creator}</p>
                                        <p className="text-gray-500">{project.role}</p>
                                    </div>
                                </p>
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="flex items-center gap-1 bg-blue-600 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 text-white  text-sm"
                                >
                                    View Details 
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
  )
}

export default ProjectCards

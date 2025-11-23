import React from "react";
import { Link as LinkIcon, Github, ExternalLink, FileText } from "lucide-react";

const Resources = ({ resources = {}, setResources }) => {
  const {
    github = "",
    liveDemo = "",
    documentation = "",
    presentation = "",
  } = resources;

  const updateResource = (field, value) => {
    setResources((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full flex justify-center px-3 mt-10">
      <div className="bg-indigo-50 p-8 rounded-xl shadow-md w-full max-w-4xl">

        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
            <LinkIcon className="text-white" size={18} />
          </div>
          <p className="text-xl">Links & Resources</p>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="font-medium text-sm text-gray-600 flex items-center gap-2 mb-1">
              <Github size={16} /> GitHub Repository
            </label>
            <input
              type="url"
              value={github}
              onChange={(e) => updateResource("github", e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full p-3 border border-gray-200 bg-white rounded-xl 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-sm text-gray-600 flex items-center gap-2 mb-1">
              <ExternalLink size={16} /> Live Project Link
            </label>
            <input
              type="url"
              value={liveDemo}
              onChange={(e) => updateResource("liveDemo", e.target.value)}
              placeholder="https://your-project.com"
              className="w-full p-3 border border-gray-200 bg-white rounded-xl 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-sm text-gray-600 flex items-center gap-2 mb-1">
              <FileText size={16} /> Documentation Link
            </label>
            <input
              type="url"
              value={documentation}
              onChange={(e) => updateResource("documentation", e.target.value)}
              placeholder="https://docs.google.com/document/..."
              className="w-full p-3 border border-gray-200 bg-white rounded-xl 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-sm text-gray-600 flex items-center gap-2 mb-1">
              <FileText size={16} /> Presentation Link
            </label>
            <input
              type="url"
              value={presentation}
              onChange={(e) => updateResource("presentation", e.target.value)}
              placeholder="https://docs.google.com/presentation/..."
              className="w-full p-3 border border-gray-200 bg-white rounded-xl 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Resources;

import { User, FileText, GitFork, Award, ExternalLink } from "lucide-react";
import PersonalDetails from "../components/PersonalDetails";

const SubmitProject = () => {
  return (
    <div className="w-full pt-20">

      {/* ---------- STEP NAVIGATION ---------- */}
      <div className="flex justify-center items-center gap-4 py-6 select-none bg-white shadow-sm">

        {/* Personal Details */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={18} />
            </div>
            <span className="text-sm font-medium text-green-600">Personal Details</span>
          </div>
        </div>
        {/* Line */}
        <div className="w-15 h-[4px] bg-blue-500"></div>

        {/* Project Details */}
        <div className="flex items-center  gap-2">
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
          style={{
            background:
              "linear-gradient(135deg, #6366F1 0%, #9333EA 50%, #EC4899 100%)",
          }}
        >
          {/* ---------- LEFT TEXT ---------- */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold  text-white">
              Share Your Innovation <br /> <span className="text-blue-200">with the World</span> 
            </h1>

            <p className="mt-4 text-lg text-purple-100">
              Tell us about yourself first, then showcase your amazing projects.
            </p>

            {/* Buttons */}
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

          {/* ---------- RIGHT FEATURE GRID ---------- */}
          <div className="grid grid-cols-2 gap-6 w-full md:w-1/2 p-4 rounded-lg bg-gray-800/30">

            {/* Documentation */}
            <div className="bg-white/10 rounded-xl py-4 flex flex-col items-center justify-center backdrop-blur-lg border border-white/20">
              <FileText size={20} className="mx-auto mb-2" />
              <p className="font-medium text-white text-sm">Documentation</p>
            </div>

            {/* Source Code */}
            <div className="bg-white/10 rounded-xl py-4 flex flex-col items-center justify-center backdrop-blur-lg border border-white/20">
              <GitFork size={20} className="mx-auto mb-2" />
              <p className="font-medium text-sm text-white">Source Code</p>
            </div>

            {/* Achievements */}
            <div className="bg-white/10 rounded-xl  py-4 flex flex-col items-center justify-center backdrop-blur-lg border border-white/20">
              <Award size={20} className="mx-auto mb-2" />
              <p className="font-medium text-sm text-white">Achievements</p>
            </div>

            {/* Live Demo */}
            <div className="bg-white/10 rounded-xl  py-4 flex flex-col items-center justify-center backdrop-blur-lg border border-white/20">
              <ExternalLink size={20} className="mx-auto mb-2" />
              <p className="font-medium text-sm text-white">Live Demo</p>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-white max-w-4xl mx-auto p-6 shadow-sm rounded-md">

        {/* personal details  */}
        <PersonalDetails />

      </div>
    </div>
  );
};

export default SubmitProject;

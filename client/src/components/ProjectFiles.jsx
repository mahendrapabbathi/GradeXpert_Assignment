import React from "react";
import { Upload, FileImage, Video } from "lucide-react";

const ProjectFiles = ({ screenshot, setScreenshot, demoVideo, setDemoVideo }) => {
  
  const handleScreenshotChange = (e) => {
    const file = e.target.files[0]; // only first file
    setScreenshot(file ? [file] : []);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setDemoVideo(file || null);
  };

  return (
    <div className="w-full flex justify-center px-3 mt-10">
      <div className="bg-pink-50 p-8 rounded-xl shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <div className="w-7 h-7 bg-purple-500 rounded-md flex items-center justify-center">
            <Upload className="text-white" size={18} />
          </div>
          <p className="text-xl">Project Files</p>
        </h2>

        {/* Screenshot Upload */}
        <label className="w-full border-2 border-dashed border-pink-300 bg-white rounded-xl flex flex-col items-center justify-center py-10 transition hover:border-pink-500 cursor-pointer relative">
          <Upload className="text-pink-500 mb-3" size={40} />
          <p className="text-gray-600 text-sm mb-4">
            Upload Screenshot (Only 1)
          </p>

          <input type="file" accept="image/*" onChange={handleScreenshotChange} />
        </label>

        {screenshot.length > 0 && (
          <div className="mt-4 space-y-2">
            {screenshot.map((file, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <FileImage size={18} className="text-pink-600" />
                {file.name}
              </div>
            ))}
          </div>
        )}

        {/* Demo Video Upload */}
        <div className="mt-8">
          <label className="block mb-2 font-medium text-sm text-black">
            Demo Video (Optional – Max 20MB)
          </label>
          <label className="relative cursor-pointer block">
            <Video className="absolute left-3 top-3 text-purple-600" size={20} />
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full p-3 pl-10 border border-gray-200 bg-white rounded-xl"
            />
          </label>
        </div>

        {demoVideo && (
          <p className="mt-2 text-sm flex items-center gap-2 text-gray-700">
            <Video size={18} className="text-purple-600" /> {demoVideo.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectFiles;

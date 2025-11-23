import React from "react";
import { Info } from "lucide-react";

const UploadGuidelines = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-sm max-w-4xl mx-auto mt-10">

      {/* Header */}
      <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
        <Info size={18} className="text-yellow-600" />
        Upload Guidelines
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">

        {/* File Size Limits */}
        <div>
          <h3 className="font-semibold mb-2">File Size Limits:</h3>
          <ul className="list-disc ml-4">
            <li>Screenshots: 2MB each (auto-compressed)</li>
            <li>Video: 20MB maximum</li>
            <li>Profile Picture: 2MB (auto-compressed)</li>
            <li>Total upload: 25MB maximum</li>
          </ul>
        </div>

        {/* Tips */}
        <div>
          <h3 className="font-semibold mb-2">Tips to reduce size:</h3>
          <ul className="list-disc ml-4">
            <li>Use fewer screenshots (3–4 is ideal)</li>
            <li>Compress video before upload</li>
            <li>Images are auto-compressed to JPEG</li>
            <li>Remove unnecessary files</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadGuidelines;
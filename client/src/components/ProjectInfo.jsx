import React, { useRef } from "react";
import {
  Calendar,
  FileText,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  ListOrdered,
} from "lucide-react";

const ProjectInfo = ({ projectInfo, setProjectInfo }) => {
  const editorRef = useRef(null);

  // Update state for normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save rich text content changes
  const handleEditorInput = () => {
    setProjectInfo((prev) => ({
      ...prev,
      detailedDescription: editorRef.current.innerHTML,
    }));
  };

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleEditorInput();
  };

  return (
    <div className="w-full flex justify-center px-3 mt-10">
      <div className="bg-green-50 p-8 rounded-xl shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <div className="w-7 h-7 bg-green-500 rounded-md flex items-center justify-center">
            <FileText className="text-white" size={18} />
          </div>
          <p className="text-xl">Project Information</p>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium text-sm text-gray-500">Project Title *</label>
            <input
              name="title"
              value={projectInfo.title || ""}
              onChange={handleChange}
              type="text"
              placeholder="Enter your project title"
              className="w-full mt-1 p-3 border bg-white rounded-xl focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label className="font-medium text-sm text-gray-500">Project Type *</label>
            <select
              name="projectType"
              value={projectInfo.projectType || ""}
              onChange={handleChange}
              className="w-full mt-1 p-3 border bg-white rounded-xl focus:ring-2 focus:ring-green-600"
              required
            >
              <option value="">Select project type</option>
              <option value="Web App">Web App</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Data Science">Data Science</option>
              <option value="AI/ML">AI/ML</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-sm text-gray-500">
              Project Duration (weeks) *
            </label>
            <input
              name="duration"
              value={projectInfo.duration || ""}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 12"
              className="w-full mt-1 p-3 border bg-white rounded-xl focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <div className="flex gap-1 items-center">
              <Calendar size={18} className="text-gray-500" />
              <label className="font-medium text-sm text-gray-500">Project Date *</label>
            </div>
            <input
              name="projectDate"
              value={projectInfo.projectDate || ""}
              onChange={handleChange}
              type="date"
              className="w-full mt-1 p-3 border bg-white rounded-xl focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="font-medium text-sm text-gray-500">Short Description *</label>
          <textarea
            name="shortDesc"
            value={projectInfo.shortDesc || ""}
            onChange={handleChange}
            rows="3"
            placeholder="Briefly describe your project..."
            className="w-full mt-1 p-3 border bg-white rounded-xl focus:ring-2 focus:ring-green-600"
            required
          ></textarea>
        </div>

        <div className="mt-6">
          <label className="font-medium text-sm text-gray-500 mb-1 block">
            Detailed Description
          </label>

          <div className="border rounded-xl bg-white">
            <div className="flex items-center gap-4 border-b px-3 py-2">
              <select
                className="bg-transparent text-sm"
                onChange={(e) => applyFormat("formatBlock", e.target.value)}
              >
                <option value="p">Normal</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
              </select>

              <button onClick={() => applyFormat("bold")}>
                <Bold size={16} />
              </button>
              <button onClick={() => applyFormat("italic")}>
                <Italic size={16} />
              </button>
              <button onClick={() => applyFormat("underline")}>
                <Underline size={16} />
              </button>
              <button
                onClick={() => {
                  const url = prompt("Enter URL");
                  if (url) applyFormat("createLink", url);
                }}
              >
                <Link size={16} />
              </button>
              <button onClick={() => applyFormat("insertUnorderedList")}>
                <List size={16} />
              </button>
              <button onClick={() => applyFormat("insertOrderedList")}>
                <ListOrdered size={16} />
              </button>
            </div>

            <div
              ref={editorRef}
              contentEditable
              onInput={handleEditorInput}
              className="w-full min-h-[150px] px-3 py-3 focus:outline-none"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;

import React, { useState } from "react";
import { ClipboardList, Plus } from "lucide-react";
import CheckBoxList from "./CheckBoxList";

const techOptions = [
  "React Native", "Spring Boot", "Django", "FastAPI",
  "Express.js", "GraphQL", "REST API", "WebRTC",
  "Socket.io", "Apache Kafka", "Elasticsearch", "Firebase",
  "Supabase"
];

const ProjectDetails = ({ projectDetails = {}, setProjectDetails }) => {
  const {
    outcome = "",
    technologies = [],
    teamMembers = [{ name: "", role: "" }],
  } = projectDetails;

  const updateDetails = (field, value) => {
    setProjectDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTeamMember = () => {
    updateDetails("teamMembers", [...teamMembers, { name: "", role: "" }]);
  };

  const updateTeamMember = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    updateDetails("teamMembers", updatedMembers);
  };

  const [customTech, setCustomTech] = useState("");

  const addCustomTech = () => {
    if (customTech.trim() !== "" && !technologies.includes(customTech)) {
      updateDetails("technologies", [...technologies, customTech]);
      setCustomTech("");
    }
  };

  return (
    <div className="bg-orange-50 p-8 rounded-xl shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
          <ClipboardList className="text-white" size={18} />
        </div>
        Project Details
      </h2>

      {/* Outcome */}
      <label className="text-sm font-medium text-gray-600">Outcome & Impact</label>
      <textarea
        rows="3"
        placeholder="Describe the results and impact of your project"
        className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
        value={outcome}
        onChange={(e) => updateDetails("outcome", e.target.value)}
      />

      {/* Technologies */}
      <div className="mt-6">
        <label className="text-sm font-medium text-gray-600">Technologies Used</label>

        <CheckBoxList
          techs={techOptions}
          selected={technologies}
          setSelected={(techs) => updateDetails("technologies", techs)}
        />

        {/* Custom Tech */}
        <div className="flex items-center gap-3 mt-4">
          <input
            type="text"
            placeholder="Add a custom technology"
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
            value={customTech}
            onChange={(e) => setCustomTech(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomTech()}
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            onClick={addCustomTech}
          >
            Add Tech
          </button>
        </div>
      </div>

      {/* Team Members */}
      <div className="mt-6">
        <label className="text-sm font-medium text-gray-600">Team Members</label>

        {teamMembers.map((member, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 bg-white p-3 rounded-md">
            <input
              type="text"
              placeholder="Team member name"
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={member.name}
              onChange={(e) => updateTeamMember(index, "name", e.target.value)}
            />

            <input
              type="text"
              placeholder="Role (e.g., Frontend Developer)"
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={member.role}
              onChange={(e) => updateTeamMember(index, "role", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={addTeamMember}
          className="w-full mt-4 border-2 border-orange-400 border-dashed text-orange-600 py-3 cursor-pointer rounded-xl flex justify-center gap-2 items-center"
        >
          <Plus size={18} /> Add Team Member
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;

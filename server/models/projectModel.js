import mongoose from "mongoose";

// Sub-schema for team members
const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
});

// Main project schema
const projectSchema = new mongoose.Schema(
  {
    personal: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      collegeName: { type: String },
      collegeLocation: { type: String },
      yearOfStudy: { type: String },
      branch: { type: String },
      profilePic: { type: String, required: true }, // only one profile pic
    },
    projectInfo: {
      title: { type: String, required: true },
      type: { type: String },
      duration: { type: Number },
      date: { type: Date },
      shortDesc: { type: String, required: true },
      detailedDesc: { type: String },
    },
    projectFiles: {
      screenshot: { type: String, required: true }, // only one screenshot
      demoVideo: { type: String },
    },
    projectDetails: {
      outcome: { type: String },
      technologies: [{ type: String, required: true }],
      teamMembers: [teamMemberSchema],
      role : { type: String },
    },
    resources: {
      github: { type: String, required: true },
      liveDemo: { type: String },
      documentation: { type: String },
      presentation: { type: String },
    },
  },
  { timestamps: true }
);

const Project = mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project;

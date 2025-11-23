import { Book, User } from "lucide-react";
import React from "react";

const PersonalDetails = ({ setFormData }) => {

  const handleChange = (e) => {
  const { name, value, files } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: files ? files[0] : value, // store single file
  }));
};


  return (
    <div className="w-full flex justify-center px-3 ">
      <div className="bg-green-50 p-8 rounded-xl shadow-md w-full max-w-4xl ">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <div className="w-7 h-7 bg-green-500 rounded-md flex items-center justify-center">
            <User className="text-white" size={18} />
          </div>
          <p className="text-xl">Personal Details</p>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="font-medium text-sm text-gray-500">Your Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-sm text-gray-500">Your Email *</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@university.edu"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          {/* College Name */}
          <div>
            <label className="font-medium text-sm text-gray-500">College Name *</label>
            <input
              type="text"
              name="collegeName"
              placeholder="Enter your college name"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          {/* College Location */}
          <div>
            <label className="font-medium text-sm text-gray-500">College Location *</label>
            <input
              type="text"
              name="collegeLocation"
              placeholder="City, State"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          {/* Year of Study */}
          <div>
            <label className="font-medium text-sm text-gray-500 flex items-center gap-1">
              <Book /> Year of Study *
            </label>
            <input
              type="text"
              name="yearOfStudy"
              placeholder="e.g., BTech 2, BCom 1"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

          {/* Branch */}
          <div>
            <label className="font-medium text-sm text-gray-500">Branch/Department *</label>
            <input
              type="text"
              name="branch"
              placeholder="e.g., Computer Science, Commerce"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>

        </div>

        {/* Profile Picture */}
        <div className="mt-6 flex flex-col">
          <label className="font-medium text-sm text-gray-500">
            Your Profile Picture (Optional, max 2MB - will be compressed)
          </label>
          <input
            type="file"
            name="profilePic"
            onChange={handleChange}
            accept="image/*"
            className="mt-2 w-full p-3 border border-gray-200 bg-white rounded-xl file:border file:border-gray-300 file:rounded-xl file:px-4 file:py-2 file:bg-gray-100"
          />
        </div>

      </div>
    </div>
  );
};

export default PersonalDetails;

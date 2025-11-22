import { Book, User } from "lucide-react";
import React, { useState } from "react";

const PersonalDetails = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        collegeName: "",
        collegeLocation: "",
        yearOfStudy: "",
        branch: "",
        profilePic: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data: ", formData);
    };

    return (
        <div className="w-full flex justify-center  px-3">
            <form
                onSubmit={handleSubmit}
                className="bg-green-50 p-8 rounded-xl shadow-md w-full max-w-4xl"
            >
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
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
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
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@university.edu"
                            className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
                            required
                        />
                    </div>

                    {/* College Name */}
                    <div>
                        <label className="font-medium text-sm text-gray-500"> College Name *</label>
                        <input
                            type="text"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            placeholder="Enter your college name"
                            className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
                            required
                        />
                    </div>

                    {/* College Location */}
                    <div>
                        <label className="font-medium text-sm text-gray-500"> College Location *</label>
                        <input
                            type="text"
                            name="collegeLocation"
                            value={formData.collegeLocation}
                            onChange={handleChange}
                            placeholder="City, State"
                            className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Year of Study */}
                    <div>
                        <label className="font-medium text-sm text-gray-500 flex items-center gap-1"><Book /> Year of Study *</label>
                        <input
                            type="text"
                            name="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                            placeholder="e.g., BTech 2, BCom 1"
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
                            value={formData.branch}
                            onChange={handleChange}
                            placeholder="e.g., Computer Science, Commerce"
                            className="w-full mt-1 p-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-green-600 focus:outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Profile Picture */}
                <div className="mt-6 flex">
                    <label className="font-medium text-sm text-gray-500">
                        Your Profile Picture (Optional, max 2MB - will be compressed)
                    </label>
                    <input
                        type="file"
                        name="profilePic"
                        onChange={handleChange}
                        accept="image/*"
                        className="mt-2"
                    />
                </div>

                
            </form>
        </div>
    );
};


export default PersonalDetails

import React from "react";
import { Link } from "react-router-dom";
import { Rocket, BadgeCheck, Users, Award } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-4 min-h-screen pt-20">

        <div className="flex flex-col justify-center items-center max-w-3xl text-center mx-auto mt-16">
          <h1 className="text-6xl font-bold ">
            Showcase Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Innovation
            </span>
          </h1>

          <p className="mt-6 text-gray-500 text-xl">
            Powerfolio is the ultimate platform for students to showcase their projects, connect with peers, and inspire the next generation of innovators.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-12">
            <Link
              to="/submit"
              className="px-6 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-md"
            >
              Submit Your Project
            </Link>

            <Link
              to="/projects"
              className="px-8 py-5 border-2 border-gray-300 text-blue-600 rounded-lg font-semibold hover:border-2 hover:border-blue-300 transition-all shadow-md"
            >
              Explore Projects
            </Link>
          </div>

        
      </div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 mt-20 px-6 max-w-8xl mx-auto text-center mb-10">
  <FeatureCard
    icon={<Rocket className="w-8 h-8 text-blue-600" />}
    title="Quick Launch"
    text="Submit your ideas effortlessly"
  />

  <FeatureCard
    icon={<BadgeCheck className="w-8 h-8 text-yellow-500" />}
    title="High Quality"
    text="Showcase your project professionally"
  />

  <FeatureCard
    icon={<Users className="w-8 h-8 text-green-600" />}
    title="Collaboration"
    text="Engage with innovators worldwide"
  />

  <FeatureCard
    icon={<Award className="w-8 h-8 text-purple-600" />}
    title="Recognition"
    text="Earn appreciation & awards"
  />
</div>
    </section>
  );
};

// Card Component
const FeatureCard = ({ icon, title, text }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex justify-center items-center">
        {icon}
      </div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
};


export default Hero;

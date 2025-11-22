import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  // State to handle form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-center text-gray-900">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h2>
        <p className="text-center text-gray-500 mt-2 text-sm">
          {isLogin ? "Login to continue" : "Sign up and explore amazing projects!"}
        </p>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          
          {/* Full Name only in Signup */}
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="mt-2 py-3 rounded-lg font-semibold text-white  bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            
            className="text-blue-600 font-semibold hover:underline ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

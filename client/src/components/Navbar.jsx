import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [btnState, setBtnState] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <header className="fixed z-5 backdrop-blur-2xl w-full shadow-sm flex items-center justify-between px-18 py-3 bg-white">
            <Link to="/" className="flex items-center gap-2">
                <div className="w-35 h-10 flex items-center justify-between rounded-lg text-white text-xl font-bold">
                    <img src={assets.logo} alt="logo" />
                </div>
            </Link>

            <nav className="flex items-center justify-center gap-10">
                <ul className="flex gap-12 text-gray-700 font-medium items-center">
                    <li className="hover:text-blue-600 cursor-pointer">
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li className="hover:text-blue-600 cursor-pointer">
                        <Link to="/submit-project">Submit Project</Link>
                    </li>

                    {user ? (
                        <li className="flex items-center gap-4">
                            {/* Circle with first letter */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold text-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>

                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-blue-600 text-white px-6 py-2 cursor-pointer rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                            >
                                Login / Sign Up
                            </button>
                        </li>
                    )}

                </ul>
            </nav>
        </header>
    );
};

export default Navbar;

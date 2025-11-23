import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import SubmitProject from "./pages/SubmitProject";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast"; // <-- Add this

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* 🔔 Toast Container Here */}
      <Toaster position="top-right" />

      <div className="flex-1">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route
    path="/submit-project"
    element={
      <ProtectedRoute>
        <SubmitProject />
      </ProtectedRoute>
    }
  />
  <Route
    path="/submit-project/:id"
    element={
      <ProtectedRoute>
        <SubmitProject />
      </ProtectedRoute>
    }
  />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>

      </div>

      <Footer />
    </div>
  );
};

export default App;

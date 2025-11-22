import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import ProjectsPage from './pages/ProjectsPage'

const App = () => {
  
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/projects' element={<ProjectsPage />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App

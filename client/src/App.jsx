import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import ProjectsPage from './pages/ProjectsPage'
import SubmitProject from './pages/SubmitProject'

const App = () => {

  return (
    <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/submit-project' element={<SubmitProject />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App

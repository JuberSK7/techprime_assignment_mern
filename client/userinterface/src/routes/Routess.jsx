import React from 'react'
import {Routes,Route} from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import ProjectList from '../pages/ProjectsList'
import AddProject from '../pages/AddProjects'
import SecretRouts from './SecretRouts'

const Routess = () => {
  return (
    <Routes>
        <Route path='/' element={<SecretRouts><Dashboard/></SecretRouts>} />
        <Route path='/list' element={<ProjectList/>} />
        <Route path='/add-project' element={<AddProject/>} />
        <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default Routess
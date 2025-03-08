import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>
    </Router>
  )
}
export default App;
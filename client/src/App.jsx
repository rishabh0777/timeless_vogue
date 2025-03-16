import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';
import Login from './components/Login';
import Signup from './components/Signup'
import About from './components/About';
import DataProvider from './contexts/DataContext';

const App = () => {
  return (
    <DataProvider value={{products: []}}>
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='about' element={<About />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='shop' element={<Shop />} />

      </Routes>
    </Router>
    </DataProvider>

  )
}
export default App;
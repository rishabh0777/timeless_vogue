import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';
import Login from './components/Login';
import Signup from './components/Signup'
import About from './components/About';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';
import EmailVerification from './components/EmailVerification'
import DataProvider from './contexts/DataContext';
import AuthProvider from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
    <DataProvider value={{products: []}}>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='shop' element={<Shop />} />
        <Route path='verify-email' element={<EmailVerification />} />
      </Routes>
    </Router>
    </DataProvider>
    </AuthProvider>

  )
}
export default App;
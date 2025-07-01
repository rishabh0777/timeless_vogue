import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';
import Login from './components/Login';
import Signup from './components/Signup'
import About from './components/About';
import Cart from './components/Cart';
import Address from './components/Address';
import Checkout from './components/Checkout'
import ScrollToTop from './components/ScrollToTop';
import ProductInfo from './components/ProductInfo';
import EmailVerification from './components/EmailVerification'
import Order from "./components/Order"
import DataProvider from './contexts/DataContext';
import AuthProvider from './contexts/AuthContext';
import AddressProvider from './contexts/AddressContext'
import {OrderProvider} from "./contexts/OrderContext";
import {PaymentProvider} from "./contexts/PaymentContext";

const App = () => { 
  return (
    <AuthProvider>
    <DataProvider value={{products: []}}>
    <AddressProvider>
    <OrderProvider>
    <PaymentProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='product/:id' element={<ProductInfo />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='address' element={<Address />} />
          <Route path='order' element={<Order />} />

        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='shop' element={<Shop />} />
        <Route path='verify-email' element={<EmailVerification />} />

      </Routes>
    </Router>
    </PaymentProvider>
    </OrderProvider>
    </AddressProvider>
    </DataProvider>
    </AuthProvider>

  )
}
export default App;
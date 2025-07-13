import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Cart from './components/Cart';
import Address from './components/Address';
import Checkout from './components/Checkout';
import ScrollToTop from './components/ScrollToTop';
import ProductInfo from './components/ProductInfo';
import EmailVerification from './components/EmailVerification';
import Order from "./components/Order";
import NotFound from "./components/NotFound";
import DataProvider from './contexts/DataContext';
import AuthProvider from './contexts/AuthContext';
import AddressProvider from './contexts/AddressContext';
import { OrderProvider } from "./contexts/OrderContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <AuthProvider>
      <DataProvider value={{ products: [] }}>
        <AddressProvider>
          <OrderProvider>
            <PaymentProvider>
              <Router>
                <ScrollToTop />
                <ScrollToTop />
  <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: '#1a1a1a',
        color: '#fff',
        borderRadius: '6px',
        fontSize: '0.9rem',
      },
      success: {
        iconTheme: {
          primary: '#22c55e',
          secondary: '#fff',
        },
      },
      error: {
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },
      },
    }}
  />
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

                  {/* ⚠️ Catch-all 404 route (always last) */}
                  <Route path='*' element={<NotFound />} />

                </Routes>
              </Router>
            </PaymentProvider>
          </OrderProvider>
        </AddressProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;

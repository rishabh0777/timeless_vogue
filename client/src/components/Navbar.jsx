import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';
import axios from 'axios';
import NavbarSkeleton from '../loaderComponents/NavbarSkeleton';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { cart, cartLength, setCart } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const optionRef = useRef();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const url = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleOptions = () => {
    if (isLoggedIn) {
      optionRef.current.classList.toggle("hidden");
      optionRef.current.classList.toggle("flex");
    }
  };

  const redirectToLogin = () => {
    if (!isLoggedIn) navigate('/login');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/v1/user/logout`, {}, {
        withCredentials: true
      });

      if (response?.status === 200 || response?.status === 201) {
        optionRef.current.classList.add("hidden");
        optionRef.current.classList.remove("flex");
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        if (!user) setCart({});
        navigate('/');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  if (isLoading) return <NavbarSkeleton />;

  return (
    <>
      <nav className="w-full h-[10vh] bg-white fixed top-0 z-[1000] shadow-md px-4 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Left side: Logo and menu */}
        <div className="flex items-center gap-6 justify-between">
          <h2 className='text-xl font-bold md:text-[2vw] whitespace-nowrap'>TimelessVogue</h2>

          {/* Desktop Menu */}
          <ul className='hidden md:flex justify-center gap-6 font-semibold text-sm md:text-[0.8em] px-2'>
            <li onClick={() => navigate('/')} className='cursor-pointer hover:text-gray-700 transition'>Home</li>
            <li onClick={() => navigate('/shop')} className='cursor-pointer hover:text-gray-700 transition'>Wardrobe</li>
            <li onClick={() => navigate('/about')} className='cursor-pointer hover:text-gray-700 transition'>About</li>
            <li onClick={() => navigate('/order')} className='cursor-pointer hover:text-gray-700 transition'>Order</li>
          </ul>
        </div>

        {/* Search bar (tab & up) */}
        <div className='hidden tab:flex items-center tab:w-[35vw] md:w-[25vw] justify-center'>
          <SearchBar />
        </div>

        {/* Right Side Icons */}
        <div className='flex items-center gap-4'>
          {/* Cart */}
          <div className='relative cursor-pointer' onClick={() => navigate('/cart')}>
            <i className="ri-shopping-bag-line text-xl md:text-[0.9em]"></i>
            {cartLength > 0 && (
              <span className='absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                {cartLength}
              </span>
            )}
          </div>

          {/* User Info Desktop */}
          <div className='hidden md:flex items-center gap-2 cursor-pointer' onClick={toggleOptions}>
            <div onClick={redirectToLogin} className='flex items-center gap-1'>
              <i className="ri-user-3-line text-xl md:text-[0.9em]"></i>
              <p className='text-sm md:text-[1em] whitespace-nowrap'>{isLoggedIn ? user?.fullname : 'Login'}</p>
            </div>
          </div>

          {/* Hamburger Icon (Mobile Only) */}
          <div className='md:hidden'>
            <i
              className="ri-menu-3-line text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            ></i>
          </div>
        </div>
      </nav>

      {/* Dropdown Options Desktop */}
      <div ref={optionRef} className='w-[150px] bg-black text-white flex-col gap-2 justify-center items-start rounded-lg z-[1000] fixed right-6 top-[9.5vh] py-2 px-4 hidden shadow-md'>
        <h3 className='flex items-center gap-2 cursor-pointer'><i className="ri-user-3-line"></i> Profile</h3>
        <p className='flex items-center gap-2 cursor-pointer'><i className="ri-shopping-bag-4-fill"></i> Orders</p>
        <p className='flex items-center gap-2 cursor-pointer'><i className="ri-moon-clear-line"></i> Dark</p>
        <button onClick={handleLogout} className='flex items-center gap-2 text-red-400 cursor-pointer'>
          <i className="ri-logout-circle-line"></i> Logout
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`fixed top-0 right-0 h-full w-[70vw] bg-white z-[1100] p-6 shadow-lg transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex justify-end mb-4">
          <i className="ri-close-line text-2xl cursor-pointer" onClick={() => setIsMenuOpen(false)}></i>
        </div>

        {/* Mobile Menu Links */}
        <ul className='flex flex-col gap-6 font-semibold text-base'>
          <li onClick={() => { navigate('/'); setIsMenuOpen(false); }}>Home</li>
          <li onClick={() => { navigate('/shop'); setIsMenuOpen(false); }}>Wardrobe</li>
          <li onClick={() => { navigate('/about'); setIsMenuOpen(false); }}>About</li>
          <li onClick={() => { navigate('/order'); setIsMenuOpen(false); }}>Order</li>
        </ul>

        {/* Mobile User Actions */}
        <div className="mt-6 flex flex-col gap-4">
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => { redirectToLogin(); setIsMenuOpen(false); }}>
            <i className="ri-user-3-line"></i>
            <p>{isLoggedIn ? user?.fullname : 'Login'}</p>
          </div>
          {isLoggedIn && (
            <button onClick={(e) => { handleLogout(e); setIsMenuOpen(false); }} className='flex gap-2 text-red-600'>
              <i className="ri-logout-circle-line"></i> Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

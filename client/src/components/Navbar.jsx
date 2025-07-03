import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';
import axios from 'axios';
import NavbarSkeleton from '../loaderComponents/NavbarSkeleton';
import SearchBar from './SearchBar'

const Navbar = () => {
  const { cart, cartLength, setCart } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const optionRef = useRef();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const url = import.meta.env.VITE_API_BASE_URL

 
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
      const response = await axios.post(`${url}/api/v1/user/logout`);
      if (response?.status === 200 || response?.status === 201) {
        optionRef.current.classList.add("hidden");
        optionRef.current.classList.remove("flex");
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        if (!user) setCart({});
        navigate('/');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      // console.error(error);
      throw error
    }
  };

  if (isLoading) return <NavbarSkeleton />;

  return (
    <>
      <nav className="w-full h-[10vh] px-4 md:px-12 flex items-center justify-between fixed top-0 bg-white z-[1000] shadow-lg">
        <h2 className='text-xl md:text-3xl font-bold'>TimelessVogue</h2>

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-6 font-bold text-[1vw]'>
          <li onClick={() => navigate('/')} className='cursor-pointer'>Home</li>
          <li onClick={() => navigate('/shop')} className='cursor-pointer'>Wardrobe</li>
          <li onClick={() => navigate('/about')} className='cursor-pointer'>About</li>
          <li onClick={() => navigate('/order')} className='cursor-pointer'>Order</li>
        </ul>

        {/* Search bar (desktop only) */}
        <div className='md:flex hidden gap-4 relative w-[25vw] h-[10vh] justify-center items-center'>
          <SearchBar />
        </div>

        {/* Right Side Icons */}
        <div className='flex items-center gap-6'>
          {/* Cart */}
          <div className='relative cursor-pointer' onClick={() => navigate('/cart')}>
            <i className="ri-shopping-bag-line text-xl"></i>
            {cartLength > 0 && (
              <p className='md:h-[1.5vw] md:w-[1.5vw] w-[5vw] h-[5vw] flex justify-center items-center rounded-full md:text-[0.8vw] text-[3vw] absolute md:left-2 sm:-left-2 top-[-1.2vh] bg-zinc-800 text-white'>
                {cartLength}
              </p>
            )}
          </div>

          {/* User Info Desktop */}
          <div className='hidden md:flex gap-2 cursor-pointer' onClick={toggleOptions}>
            <div onClick={redirectToLogin} className='flex items-center gap-2'>
              <i className="ri-user-3-line text-xl"></i>
              <p>{isLoggedIn ? user?.fullname : 'Login'}</p>
            </div>
          </div>

          {/* Hamburger Icon */}
          <div className='md:hidden'>
            <i
              className="ri-menu-3-line text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            ></i>
          </div>
        </div>
      </nav>

      {/* Dropdown Options Desktop */}
      <div ref={optionRef} className='w-[10vw] bg-zinc-900 text-white shadow-lg shadow-zinc-700 flex-col gap-1 justify-center items-start rounded-lg z-[1000] fixed right-[3vw] top-[9vh] py-2 px-5 hidden'>
        <h3 className='flex gap-2 cursor-pointer'><i className="ri-user-3-line"></i> Profile</h3>
        <p className='flex gap-2 cursor-pointer'><i className="ri-shopping-bag-4-fill"></i>Orders</p>
        <p className='flex gap-2 cursor-pointer'><i className="ri-moon-clear-line"></i>Dark</p>
        <button onClick={handleLogout} className='flex gap-2 cursor-pointer text-red-500'>
          <i className="ri-logout-circle-line"></i> Logout
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`fixed top-0 right-0 h-full w-[70vw] bg-white z-[1100] p-6 shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex justify-end mb-4">
          <i className="ri-close-line text-2xl cursor-pointer" onClick={() => setIsMenuOpen(false)}></i>
        </div>

        {/* Mobile Menu Links */}
        <ul className='flex flex-col gap-6 font-bold text-lg'>
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

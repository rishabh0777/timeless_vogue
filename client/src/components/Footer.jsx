import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full bg-white/10 backdrop-blur-md shadow-[0_-5px_20px_rgba(0,0,0,0.3)]'>

      {/* Top Section */}
      <div className='w-full flex flex-col md:flex-row justify-between items-center md:items-start px-4 md:px-10 pt-6 md:pt-10'>

        {/* Brand Name */}
        <div className='mb-4 md:mb-0 w-full md:w-1/3 flex justify-center md:justify-start items-center text-[6vw] md:text-[2vw] tab:text-[4vw] font-semibold'>
          <h1>Timeless Vogue</h1>
        </div>

        {/* Quick Links */}
        <div className='mb-4 md:mb-0 w-full md:w-1/3 flex flex-col items-center'>
          <h2 className='text-[5vw] tab:text-[2.5vw] md:text-[1.5vw] font-semibold mb-2'>Quick Links</h2>
          <div className='flex gap-4 text-[4vw] tab:text-[3vw] md:text-[1vw]'>
            <button onClick={() => navigate('/')} className='hover:underline'>Home</button>
            <button onClick={() => navigate('/shop')} className='hover:underline'>Shop</button>
            <button onClick={() => navigate('/about')} className='hover:underline'>About</button>
          </div>
        </div>

        {/* Social Media */}
        <div className='w-full md:w-1/3 flex justify-center md:justify-end gap-4 text-[6vw] tab:text-[3vw] md:text-[1.5vw]'>
          <a href="#" className='hover:text-zinc-300'><i className="ri-facebook-fill"></i></a>
          <a href="#" className='hover:text-zinc-300'><i className="ri-instagram-line"></i></a>
          <a href="#" className='hover:text-zinc-300'><i className="ri-twitter-x-line"></i></a>
          <a href="#" className='hover:text-zinc-300'><i className="ri-linkedin-fill"></i></a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='w-full text-center py-4 mt-4 text-[3vw] tab:text-[2vw] md:text-[1vw]'>
        <p>&copy; {new Date().getFullYear()} Timeless Vogue. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

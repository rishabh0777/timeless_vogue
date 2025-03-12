import React from 'react';
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full h-[25vh] bg-white/10 backdrop-blur-md flex flex-col border-t-2 border-zinc-500'>
      
      {/* Top Section */}
      <div className='w-full h-[80%] flex justify-between items-center px-10'>
        
        {/* Brand Name */}
        <div className='w-[30%] flex justify-center items-center text-[2.5vw] font-semibold'>
          <h1>Timeless Vogue</h1>
        </div>

        {/* Quick Links */}
        <div className='w-[40%] flex flex-col text-center'>
          <h2 className='text-[1.5vw] font-semibold'>Quick Links</h2>
          <div className='flex justify-center gap-5 text-[1vw]'>
            <a onClick={()=>navigate('/')} className='hover:underline'>Home</a>
            <a onClick={()=>navigate('/shop')} className='hover:underline'>Shop</a>
            <a onClick={()=>navigate('/about')} className='hover:underline'>About</a>
          </div>
        </div>

        {/* Social Media */}
        <div className='w-[30%] flex justify-center gap-4 text-[1.5vw]'>
          <a href="#" className='hover:text-zinc-300'><i className="ri-facebook-fill"></i></a>
          <a href="#" className='hover:text-zinc-300'><i className="ri-instagram-line"></i></a>
          <a href="#" className='hover:text-zinc-300'><i className="ri-twitter-x-line"></i></a>
          <a href="#" className='hover:text-zinc-300'><i className="ri-linkedin-fill"></i></a>
        </div>

      </div>

      {/* Bottom Section */}
      <div className='w-full h-[20%] flex justify-center items-center text-[1vw] border-t border-white/20'>
        <p>&copy; {new Date().getFullYear()} Timeless Vogue. All rights reserved.</p>
      </div>

    </div>
  );
};

export default Footer;

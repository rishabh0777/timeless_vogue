import React,{ useState, useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import {DataContext} from '../contexts/DataContext';
import axios from 'axios';

const Navbar = () => {
  const {cart, setCart, cartLength, setCartLength} = useContext(DataContext); 
 const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 
  const navigate = useNavigate();
  const optionRef = useRef();
  const user = JSON.parse(localStorage.getItem('user'))

  const toggleOptions = () => {
  if(isLoggedIn){
    if (optionRef.current?.classList.contains("hidden")) {
    optionRef.current.classList.remove("hidden");
    optionRef.current.classList.add("flex");
  } else {
    optionRef.current.classList.remove("flex");
    optionRef.current.classList.add("hidden");
  }
  }
};


const redirectToLogin = ()=>{
  if(!isLoggedIn) navigate('/login')
}

const handleLogout = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post('/api/v1/user/logout');
    console.log(response);
    if(response?.status===200 || response?.status===201){
       
      optionRef.current.classList.add("hidden");
      optionRef.current.classList.remove("flex");
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setIsLoggedIn(false)
      if(!user){
        setCart({})

      }
      
      navigate('/')
      
    }else{
      alert('Something went wrong!')
    }
  } catch (error) {
    console.error(error);
  }
}



  return (
    <>
    <nav className="w-full h-[10vh] px-12 flex items-center justify-between fixed top-0 bg-white z-[1000] shadow-lg">
        <h2 className='text-3xl'>TimelessVogue</h2>
        <ul className='text-[1vw] flex gap-[5vw] border-white/20 font-bold'>
          <li onClick={()=>navigate('/')} className='cursor-pointer'>Home</li>
          <li onClick={()=>navigate('/shop')} className='cursor-pointer'>Wardrobe</li>
          <li onClick={()=>navigate('/about')} className='cursor-pointer'>About</li>
        </ul>
        {/* Search bar */}
        <div className='flex gap-[3vw] relative '>
          <input type="text" placeholder='Search' className='bg-transparent border-2 rounded-lg w-[20vw] px-2 py-1 outline-none'/>
          <i className="ri-search-line cursor-pointer absolute right-[1vw] top-1/2 transform -translate-y-1/2 -translate-x-[1vw]"></i>
        </div>
        <div className='flex gap-[3vw]'>
         <div 
         className='flex relative'
         onClick={()=>navigate('/cart')}>
            
            <i className="ri-shopping-bag-line cursor-pointer"></i>
            {
              cartLength?(
                  cartLength>0?( 
                  <p className=' h-[1.5vw] w-[1.5vw] flex justify-center items-center rounded-full text-[0.9vw] absolute left-2 top-[-1.2vh] bg-zinc-800 text-white'>{cartLength}</p>
                ):(
                  <p></p>
                )
                ):(
                  <p></p>
                )
            }

         </div>
          <div onClick={toggleOptions} className='flex gap-[0.7vw] cursor-pointer'>
            <div onClick={redirectToLogin} className='flex gap-[0.7vw] cursor-pointer'
             >
              <i className="ri-user-3-line cursor-pointer"></i>
          {
            isLoggedIn?(
                <p>{user.fullname}</p>
              ):(
                <p>Login</p>
              )
          }
            </div>
          </div>
        </div>
    </nav>
    <div ref={optionRef} className='w-[10vw] bg-zinc-900 text-white shadow-lg shadow-zinc-700 flex flex-col gap-1 justify-center items-start rounded-lg z-[1000] fixed right-[3vw] top-[9vh]  py-2 px-5 hidden'>
      <h3 className='flex gap-2 cursor-pointer'>
        <i className="ri-user-3-line"></i>
        Profile
      </h3>
      <p className='flex gap-2 cursor-pointer'><i className="ri-shopping-bag-4-fill"></i>Orders</p>
      <p className='flex gap-2 cursor-pointer'><i className="ri-moon-clear-line"></i>Dark</p>
      <button 
      onClick={handleLogout}
      className='flex gap-2 cursor-pointer text-red-500'><i className="ri-logout-circle-line"></i> Logout</button>
    </div>
    </>
  )
}



export default Navbar
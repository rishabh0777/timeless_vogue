import React,{ useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const { userData, setUserData } = useContext(AuthContext); 
  const navigate = useNavigate();
  const optionRef = useRef();

  const toggleOptions = () => {
  if(userData){
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
  if(!userData) navigate('/login')
}

const handleLogout = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post('api/v1/user/logout');
    console.log(response);
    if(response?.status===200 || response?.status===201){
      setUserData(false)
       
      optionRef.current.classList.add("hidden");
      optionRef.current.classList.remove("flex");
      
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
          <i onClick={()=>navigate('/cart')} className="ri-shopping-bag-line cursor-pointer"></i>
          <div onClick={toggleOptions} className='flex gap-[0.7vw] cursor-pointer'>
            <div onClick={redirectToLogin} className='flex gap-[0.7vw] cursor-pointer'
             >
              <i className="ri-user-3-line cursor-pointer"></i>
          {
            userData?(
                <p>{userData.fullname}</p>
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
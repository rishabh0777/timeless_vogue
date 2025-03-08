import React,{ useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [user, setUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();
  const optionRef = useRef();

  const toggleOptions = () => {
  if(user){
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
  if(!user) navigate('/login')
}



  return (
    <>
    <nav className="w-full h-[10vh] px-12 flex items-center justify-between fixed top-0 bg-white/10 backdrop-blur-md z-[1000]">
        <h2 className='text-3xl'>TimelessVogue</h2>
        <ul className='text-[1vw] flex gap-[5vw] border-white/20 font-bold'>
          <li className='cursor-pointer'>Home</li>
          <li className='cursor-pointer'>Shop</li>
          <li className='cursor-pointer'>About</li>
          {
            isAdmin&&(
              <li className='cursor-pointer'>Admin</li>
              )
          }
        </ul>
        <div className='flex gap-[3vw]'>
          <i className="ri-shopping-bag-line cursor-pointer"></i>
          <div onClick={toggleOptions} className='flex gap-[0.7vw] cursor-pointer'>
            <div onClick={redirectToLogin} className='flex gap-[0.7vw] cursor-pointer'
             >
              <i className="ri-user-3-line cursor-pointer"></i>
          {
            user?(
                <p>Rishabh Srivastava</p>
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
      <button className='flex gap-2 cursor-pointer text-red-500'><i className="ri-logout-circle-line"></i> Logout</button>
    </div>
    </>
  )
}



export default Navbar
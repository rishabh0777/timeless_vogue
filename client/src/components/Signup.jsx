import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('')
  const handleRadioChange = (e) => {
    setUserType(e.target.value)
  }

  return (
    <div
      className="relative authBg w-full h-screen flex justify-center items-center">
      <div className='flex h-[90%] w-[90%] text-white'>
        <div className='h-full w-1/2 flex justify-center items-center '>
          <h1 className='text-[7vw] leading-[7vw]'>Welcome Back <br /> to Prestige</h1>
        </div>
        <div className='h-full w-1/2  flex flex-col items-center justify-center px-5 py-6'>
          <div className='w-[80%] flex justify-between mb-[5vh]'><h1 className='font-bold text-[1.3vw]'>Sign up</h1><p className='text-[1.2vw]'>Already have an account? <span onClick={() => navigate('/login')} className='font-bold underline cursor-pointer'> Login</span></p></div>
          <form
            className='w-[80%] min-h-[30vh] flex flex-col items-center'
            action="">
            <input
              className='bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg border-2 border-zinc-100 outline-none'
              name='fullname'
              type="text"
              placeholder='Enter your fullname' />
            <input
              className='bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg border-2 border-zinc-100 outline-none'
              name='username'
              type="text"
              placeholder='Enter your username' />
            <input
              className='bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg border-2 border-zinc-100 outline-none'
              name='email'
              type="email"
              placeholder='Enter your email' />
            <input
              className='bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg border-2 border-zinc-100 outline-none'
              name='password'
              type="password"
              placeholder='Enter your password' />
            <button className='bg-zinc-900 text-white font-bold w-[40%] py-2 rounded-full mb-[4vh] cursor-pointer'>Create account</button>
            <div className='w-full flex justify-center items-center mb-[4vh]'>
              <div className='w-[30%] h-[0.2vh] bg-zinc-700'></div>
              <p className='px-2 text-[1.2vw]'>or continue with</p>
              <div className='w-[30%] h-[0.2vh] bg-zinc-700'></div>
            </div>
            <div className='text-[3vw] flex gap-4'>
              <i class="ri-google-fill cursor-pointer"></i>
              <i class="ri-facebook-circle-fill cursor-pointer"></i>
              <i class="ri-github-fill cursor-pointer"></i>
            </div>
            <div className='flex gap-4 px-8 justify-start w-full'>
              <label
                className="flex gap-2 justify-center items-center cursor-pointer"
                htmlFor="seller">
                <input
                  className="hidden peer"
                  type="radio"
                  name="userType"
                  value="seller"
                  id="seller"
                />
                <div className="w-5 h-5 border-2 border-zinc-500 rounded-full flex justify-center items-center peer-checked:bg-zinc-900 peer-checked:border-zinc-800 transition-all duration-300">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Seller</p>
              </label>

              <label
                className="flex gap-2 justify-center items-center cursor-pointer"
                htmlFor="customer">
                <input
                  className="hidden peer"
                  type="radio"
                  name="userType"
                  value="customer"
                  id="customer"
                />
                <div className="w-5 h-5 border-2 border-zinc-500 rounded-full flex justify-center items-center peer-checked:bg-zinc-900 peer-checked:border-zinc-800 transition-all duration-300">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Customer</p>
              </label>
            </div>
            <div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
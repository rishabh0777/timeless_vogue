import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../contexts/AuthContext';
import axios from 'axios';
import SignupSkeleton from '../loaderComponents/SignupSkeleton';

const Signup = () => {
  const navigate = useNavigate();

  const [username, handleUsernameChange] = useInput("");
  const [fullname, handleFullnameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const [loading, setLoading] = useState(false);     // For signup form submission
  const [isLoading, setIsLoading] = useState(true);  // For initial page load skeleton

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = { username, fullname, email, password };

    try {
      const response = await axios.post('/api/v1/user/register', userData);
      if (response?.status === 200 || response?.status === 201) {
        alert('Check your mailbox for verification email');
        navigate('/login');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show skeleton on first page render
  if (isLoading) return <SignupSkeleton />;

  return (
    <div className="relative authBg w-full h-screen flex justify-center items-center">
      <div className="flex h-[90%] w-[90%] text-white">
        <div className="h-full w-1/2 flex justify-center items-center">
          <h1 className="text-[7vw] leading-[7vw]">Welcome Back <br /> to Prestige</h1>
        </div>
        <div className="h-full w-1/2 flex flex-col items-center justify-center px-5 py-6">
          <div className="w-[80%] flex justify-between mb-[5vh]">
            <h1 className="font-bold text-[1.3vw]">Sign up</h1>
            <p className="text-[1.2vw]">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')} className="font-bold underline cursor-pointer">
                Login
              </span>
            </p>
          </div>
          <form className="w-[80%] min-h-[30vh] flex flex-col items-center" onSubmit={handleSignup}>
            <input
              className="bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg outline-none"
              name="fullname"
              type="text"
              placeholder="Enter your fullname"
              value={fullname}
              onChange={handleFullnameChange}
              disabled={loading}
            />
            <input
              className="bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg outline-none"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              disabled={loading}
            />
            <input
              className="bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg outline-none"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              disabled={loading}
            />
            <input
              className="bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg outline-none"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            <button
              type="submit"
              className={`bg-zinc-900 text-white font-bold w-[40%] py-2 rounded-full mb-[4vh] ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="w-full flex justify-center items-center mb-[4vh]">
              <div className="w-[30%] h-[0.2vh] bg-zinc-700"></div>
              <p className="px-2 text-[1.2vw]">or continue with</p>
              <div className="w-[30%] h-[0.2vh] bg-zinc-700"></div>
            </div>
            <div className="text-[3vw] flex gap-4">
              <i className="ri-google-fill cursor-pointer"></i>
              <i className="ri-facebook-circle-fill cursor-pointer"></i>
              <i className="ri-github-fill cursor-pointer"></i>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

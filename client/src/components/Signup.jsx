import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../contexts/AuthContext';
import axios from 'axios';
import SignupSkeleton from '../loaderComponents/SignupSkeleton';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();

  const [username, handleUsernameChange] = useInput("");
  const [fullname, handleFullnameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const url = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = { username, fullname, email, password };

    try {
      const response = await axios.post(`${url}/api/v1/user/register`, userData);
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Check your mailbox for verification email');
        navigate('/login');
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login not implemented. Add Firebase/OAuth handler.");
    // Place your Firebase/OAuth logic here.
  };

  if (isLoading) return <SignupSkeleton />;

  return (
    <div className="relative authBg w-full h-screen flex justify-center items-center">
      <div className="flex sm:flex-col md:flex-row h-[90%] w-[90%] text-white">

        {/* Left Section */}
        <div className="md:h-full md:w-1/2 flex justify-center items-center">
          <h1 className="md:text-[7vw] md:leading-[7vw] text-[12vw] leading-[12vw] md:text-left sm:text-center">
            Join the elite <br />experience
          </h1>
        </div>

        {/* Signup Form */}
        <div className="h-full md:w-1/2 w-full flex flex-col items-center justify-center px-5 py-6">
          <div className="w-[90%] md:w-[80%] flex justify-between items-center mb-[5vh]">
            <h1 className="font-bold md:text-[1.3vw] text-[4vw]">Sign up</h1>
            <p className="md:text-[1.2vw] text-[3vw]">
              Already have an account?{" "}
              <span onClick={() => navigate('/login')} className="font-bold underline cursor-pointer">Login</span>
            </p>
          </div>

          <form className="md:w-[80%] w-[90%] min-h-[30vh] flex flex-col items-center" onSubmit={handleSignup}>
            <input
              className="bg-white text-zinc-800 sm:text-[4vw] md:text-[1.2vw] md:py-2 py-3 px-4 md:w-[80%] sm:w-[65vw] mb-[4vh] rounded-md shadow-lg outline-none"
              name="fullname"
              type="text"
              placeholder="Enter your fullname"
              value={fullname}
              onChange={handleFullnameChange}
              disabled={loading}
            />
            <input
              className="bg-white text-zinc-800 sm:text-[4vw] md:text-[1.2vw] md:py-2 py-3 px-4 md:w-[80%] sm:w-[65vw] mb-[4vh] rounded-md shadow-lg outline-none"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              disabled={loading}
            />
            <input
              className="bg-white text-zinc-800 sm:text-[4vw] md:text-[1.2vw] md:py-2 py-3 px-4 md:w-[80%] sm:w-[65vw] mb-[4vh] rounded-md shadow-lg outline-none"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              disabled={loading}
            />
            <input
              className="bg-white text-zinc-800 sm:text-[4vw] md:text-[1.2vw] md:py-2 py-3 px-4 md:w-[80%] sm:w-[65vw] mb-[4vh] rounded-md shadow-lg outline-none"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              disabled={loading}
            />

            <button
              type="submit"
              className={`bg-zinc-900 text-white font-bold md:w-[40%] sm:w-[60vw] md:py-2 py-3 rounded-full mb-[2vh] cursor-pointer ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="bg-white text-black font-semibold md:w-[40%] sm:w-[60vw] md:py-2 py-3 rounded-full border border-zinc-300 flex items-center justify-center gap-2 hover:bg-zinc-100 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput, AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import LoginSkeleton from '../loaderComponents/LoginSkeleton';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext); 
  const [username, handleUsernameChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const url = import.meta.env.VITE_API_BASE_URL


  const [loading, setLoading] = useState(false);     // Login submission loader
  const [isLoading, setIsLoading] = useState(true);  // Page skeleton loader

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Delay for effect (adjust as needed)
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/v1/user/login`, { username, password });
      if (response?.status === 200 || response?.status === 201) {
        const { accessToken, refreshToken, user } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      // console.error(error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show skeleton only when page is first loading
  if (isLoading) return <LoginSkeleton />;

  return (
    <div className="relative authBg w-full h-screen flex justify-center items-center">
      <div className="flex sm:flex-col md:flex-row h-[90%] w-[90%] text-white">
        <div className="md:h-full md:w-1/2 flex justify-center items-center">
          <h1 className="md:text-[7vw] md:leading-[7vw] text-[12vw] leading-[12vw] md:text-left sm:text-center">Join the elite <br />experience</h1>
        </div>
        <div className="h-full md:w-1/2 w-full flex flex-col items-center justify-center px-5 py-6">
          <div className="w-[90%] md:w-[80%] flex justify-between items-center mb-[5vh]">
            <h1 className="font-bold md:text-[1.3vw] text-[4vw]">Log in</h1>
            <p className="md:text-[1.2vw] text-[3vw]">
              Don't have an account? 
              <span onClick={() => navigate('/Signup')} className="font-bold underline cursor-pointer"> Signup</span>
            </p>
          </div>
          <form className="md:w-[80%] w-[90%] min-h-[30vh] flex flex-col items-center" onSubmit={handleLogin}>
            <input
              className="bg-white text-zinc-800 sm:text-[4vw] md:text-[1.2vw] md:py-2 py-3 px-4 md:w-[80%] sm:w-[65vw] mb-[4vh] rounded-md shadow-lg outline-none"
              name="username" type="text" placeholder="Enter your email or username"
              onChange={handleUsernameChange}
              disabled={loading}
            />
            <input
              className="bg-white text-zinc-800 sm:text-[4vw] md:text-[1.2vw] md:py-2 py-3 px-4 md:w-[80%] sm:w-[65vw] mb-[4vh] rounded-md shadow-lg outline-none"
              name="password" type="password" placeholder="Enter your password"
              onChange={handlePasswordChange}
              disabled={loading}
            />
            <button
              type="submit"
              className={`bg-zinc-900 text-white font-bold md:w-[40%] cursor-pointer sm:w-[60vw] md:py-2 py-3 rounded-full mb-[4vh] ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <div className="w-full flex justify-center items-center mb-[4vh]">
              <div className="w-[30%] h-[0.2vh] bg-zinc-700"></div>
              <p className="px-2 md:text-[1.2vw] text-[3vw]">or continue with</p>
              <div className="w-[30%] h-[0.2vh] bg-zinc-700"></div>
            </div>
            <div className="md:text-[3vw] sm:text-[7vw] flex gap-4">
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

export default Login;

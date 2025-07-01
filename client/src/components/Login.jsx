import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../contexts/AuthContext';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 

  const [username, handleUsernameChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { username, password };

    try {
      const response = await axios.post('/api/v1/user/login', userData);
      if (response?.status === 200 || response?.status === 201) {
        const { accessToken, refreshToken, user } = response.data.data;

        localStorage.setItem("accessToken", accessToken); // Make sure to use this key later
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative authBg w-full h-screen flex justify-center items-center">
      <div className="flex h-[90%] w-[90%] text-white">
        <div className="h-full w-1/2 flex justify-center items-center">
          <h1 className="text-[7vw] leading-[7vw]">Join the elite <br />experience</h1>
        </div>
        <div className="h-full w-1/2 flex flex-col items-center justify-center px-5 py-6">
          <div className="w-[80%] flex justify-between mb-[5vh]">
            <h1 className="font-bold text-[1.3vw]">Log in</h1>
            <p className="text-[1.2vw]">Don't have an account? 
              <span onClick={() => navigate('/Signup')} className="font-bold underline cursor-pointer"> Signup</span>
            </p>
          </div>
          <form 
            className="w-[80%] min-h-[30vh] flex flex-col items-center"
            onSubmit={handleLogin}
          >
            <input 
              className="bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg border-2 border-zinc-100 outline-none"
              name="username" 
              onChange={handleUsernameChange}
              type="text" 
              placeholder="Enter your email or username"
            />
            <input 
              className="bg-white text-zinc-800 py-2 px-4 w-[80%] mb-[4vh] rounded-md shadow-lg border-2 border-zinc-100 outline-none"
              name="password" 
              type="password"
              onChange={handlePasswordChange} 
              placeholder="Enter your password"
            />
            <button className="bg-zinc-900 text-white font-bold w-[40%] py-2 rounded-full mb-[4vh] cursor-pointer">
              Log in
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

export default Login;

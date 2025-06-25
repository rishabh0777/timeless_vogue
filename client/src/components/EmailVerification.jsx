import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const navigate = useNavigate();

  const verifyUser = async () => {
    try {
      // Get the token from the URL query parameters
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');

      if (!token) {
        alert('Invalid or missing token.');
        return;
      }

      // Send a GET request to the backend to verify the email
      const response = await axios.get(
        `api/v1/user/verify-email?token=${token}`
      );

      if (response.status === 201) {
        alert('Email verified successfully!');
        navigate('/login'); // Redirect to the login page after successful verification
      } else {
        alert('Failed to verify email. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      alert('An error occurred while verifying your email. Please try again.');
      navigate('/Login');
    }
  };

  return (
    <div className="w-full h-screen text-center p-12 text-[4vw] flex flex-col justify-center items-center ">
      <h1>Click here to verify your email</h1>
      <button
        onClick={verifyUser}
        className="px-2 py-1 text-[1.2vw] bg-zinc-700 rounded-lg mt-8 text-white"
      >
        Verify
      </button>
    </div>
  );
};

export default EmailVerification;
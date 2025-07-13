import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EmailVerification = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_BASE_URL;
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState("");

  const verifyUser = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');

      if (!token) {
        setError("Missing or invalid token.");
        toast.error("Missing or invalid token.");
        setIsVerifying(false);
        return;
      }

      const response = await axios.get(`${url}/api/v1/user/verify-email?token=${token}`);

      if (response.status === 201) {
        toast.success("Email verified successfully!");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error("Verification failed. Please try again.");
        setIsVerifying(false);
      }
    } catch (err) {
      toast.error("Error verifying email. Try again.");
      setError("An error occurred while verifying your email.");
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    verifyUser(); // Automatically trigger on load
  }, []);

  return (
    <div className="w-full h-screen text-center p-12 text-[4vw] flex flex-col justify-center items-center">
      {isVerifying ? (
        <h1>Verifying your email...</h1>
      ) : (
        <>
          <h1 className="mb-4">Click below to retry email verification</h1>
          {error && <p className="text-red-500 mb-4 text-[1.2vw]">{error}</p>}
          <button
            onClick={verifyUser}
            className="px-4 py-2 text-[1.2vw] bg-zinc-700 rounded-lg text-white hover:bg-zinc-800"
          >
            Verify Email
          </button>
        </>
      )}
    </div>
  );
};

export default EmailVerification;

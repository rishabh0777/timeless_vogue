import React from 'react';

const SignupSkeleton = () => {
  return (
    <div className="authBg w-full h-screen flex justify-center items-center animate-pulse">
      <div className="flex sm:flex-col md:flex-row h-[90%] w-[90%] text-white">
        {/* Left section skeleton */}
        <div className="md:h-full md:w-1/2 flex justify-center items-center">
          <div className="h-[20vh] w-[80%] bg-zinc-300 rounded-lg"></div>
        </div>

        {/* Right form section skeleton */}
        <div className="h-full md:w-1/2 w-full flex flex-col items-center justify-center px-5 py-6">
          <div className="w-[90%] md:w-[80%] mb-[5vh]">
            <div className="h-6 bg-zinc-300 w-[30%] mb-4 rounded"></div>
            <div className="h-4 bg-zinc-300 w-[60%] rounded"></div>
          </div>
          <div className="md:w-[80%] w-[90%] space-y-6">
            <div className="h-12 bg-zinc-300 rounded-md shadow-lg"></div>
            <div className="h-12 bg-zinc-300 rounded-md shadow-lg"></div>
            <div className="h-12 bg-zinc-300 rounded-md shadow-lg"></div>
            <div className="h-12 bg-zinc-300 rounded-md shadow-lg"></div>
            <div className="h-12 bg-zinc-300 rounded-full shadow-lg"></div>
            <div className="flex items-center gap-4 justify-center">
              <div className="h-8 w-8 bg-zinc-300 rounded-full"></div>
              <div className="h-8 w-8 bg-zinc-300 rounded-full"></div>
              <div className="h-8 w-8 bg-zinc-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSkeleton;

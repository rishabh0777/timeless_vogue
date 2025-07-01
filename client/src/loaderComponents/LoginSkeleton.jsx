import React from 'react';

const LoginSkeleton = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-zinc-900 animate-pulse">
      <div className="flex h-[90%] w-[90%] text-white">
        <div className="h-full w-1/2 flex justify-center items-center">
          <div className="bg-zinc-800 h-[40%] w-[80%] rounded-lg" />
        </div>
        <div className="h-full w-1/2 flex flex-col items-center justify-center px-5 py-6">
          <div className="w-[80%] mb-[5vh] space-y-3">
            <div className="h-6 w-1/3 bg-zinc-700 rounded" />
            <div className="h-6 w-2/3 bg-zinc-700 rounded" />
          </div>
          <div className="w-[80%] space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-10 w-[80%] bg-zinc-700 rounded" />
            ))}
            <div className="h-10 w-[40%] bg-zinc-700 rounded-full" />
            <div className="w-full flex justify-center items-center space-x-4">
              <div className="h-[1px] w-[30%] bg-zinc-600" />
              <div className="h-5 w-[30%] bg-zinc-700 rounded" />
              <div className="h-[1px] w-[30%] bg-zinc-600" />
            </div>
            <div className="flex gap-6 text-[3vw] text-zinc-600">
              <div className="h-8 w-8 bg-zinc-700 rounded-full" />
              <div className="h-8 w-8 bg-zinc-700 rounded-full" />
              <div className="h-8 w-8 bg-zinc-700 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSkeleton;

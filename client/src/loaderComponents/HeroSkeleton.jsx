import React from 'react';

const HeroSkeleton = () => {
  return (
    <div className="w-full min-h-screen relative animate-pulse">
      <div className="w-[90%] max-h-[80vh] min-h-[70vh] bg-zinc-300 absolute top-[15vh] left-1/2 transform -translate-x-1/2 overflow-hidden rounded-md">
        <div className="absolute z-[10] top-[15%] left-[3vw] h-[7vw] w-[60%] bg-zinc-400 rounded"></div>
        <div className="absolute z-[10] top-[45%] left-[3vw] h-[2.5vw] w-[45%] bg-zinc-400 rounded"></div>
        <div className="absolute z-[10] top-[70%] left-[35%] h-[3.5vw] w-[12vw] bg-zinc-500 rounded-lg"></div>
        <div className="w-full h-full absolute z-[8] bg-zinc-300 object-cover object-top" />
      </div>
    </div>
  );
};

export default HeroSkeleton;

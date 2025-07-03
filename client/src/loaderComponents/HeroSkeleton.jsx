import React from "react";

const HeroSkeleton = () => {
  return (
    <div className="w-full sm:min-h-[60vh] md:min-h-screen relative flex flex-col justify-center items-center animate-pulse">
      <div className="w-[95%] h-[30vh] md:h-[80vh] sm:mt-[12vh] md:mt-10 relative overflow-hidden rounded-lg bg-zinc-200"></div>

      {/* Headline + Subtext + Button placeholders */}
      <div className="absolute z-10 flex flex-col gap-4 sm:left-[5%] top-[30%]">
        <div className="h-10 sm:h-[6vw] w-[60vw] bg-zinc-300 rounded"></div>
        <div className="h-5 sm:h-[3vw] w-[70vw] bg-zinc-300 rounded"></div>
        <div className="h-5 sm:h-[3vw] w-[40vw] bg-zinc-300 rounded"></div>
        <div className="h-10 w-[30vw] bg-zinc-400 rounded mt-4"></div>
      </div>
    </div>
  );
};

export default HeroSkeleton;

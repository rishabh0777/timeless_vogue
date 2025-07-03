import React from 'react';

const AboutSkeleton = () => {
  return (
    <div className="w-full min-h-screen pt-[12vh] pb-[5vh] bg-[#f5f5f5] px-4 flex flex-col items-center animate-pulse">
      {/* Heading Skeleton */}
      <div className="h-[10vw] sm:h-[8vw] md:h-[4vw] w-[60vw] bg-zinc-300 rounded mb-8"></div>

      {/* Service Cards Skeleton Grid */}
      <div className="w-full sm:max-w-[90vw] md:max-w-[70vw] grid md:grid-cols-2 sm:grid-cols-1 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-full bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4"
          >
            <div className="h-6 sm:h-[6vw] md:h-[2vw] w-[60%] bg-zinc-300 rounded"></div>
            <div className="h-4 sm:h-[4vw] md:h-[1vw] w-[90%] bg-zinc-200 rounded"></div>
            <div className="h-4 sm:h-[4vw] md:h-[1vw] w-[85%] bg-zinc-200 rounded"></div>
            <div className="h-4 sm:h-[4vw] md:h-[1vw] w-[75%] bg-zinc-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSkeleton;

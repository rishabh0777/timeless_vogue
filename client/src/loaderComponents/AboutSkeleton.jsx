import React from 'react';

const AboutSkeleton = () => {
  return (
    <div className="w-full min-h-[120vh] pt-[10vh] flex flex-col items-center justify-center bg-[#f5f5f5] animate-pulse">
      {/* Heading */}
      <div className="h-[6vh] w-[30vw] bg-zinc-300 rounded mb-10" />

      {/* Grid Skeleton */}
      <div className="w-[90%] min-h-[80vh] grid grid-cols-2 gap-2 justify-items-center items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-[40vw] h-[40vh] bg-zinc-200 rounded flex flex-col justify-center items-center gap-4 p-6"
          >
            <div className="h-8 w-[60%] bg-zinc-300 rounded" />
            <div className="h-4 w-[80%] bg-zinc-300 rounded" />
            <div className="h-4 w-[75%] bg-zinc-300 rounded" />
            <div className="h-4 w-[70%] bg-zinc-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSkeleton;

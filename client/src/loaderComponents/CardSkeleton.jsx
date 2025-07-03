import React from 'react';

const CardSkeleton = ({ className }) => {
  return (
    <div
      className={`bg-white w-[90vw] sm:w-[70vw] md:w-[24vw] h-[65vh] rounded-2xl overflow-hidden shadow-md animate-pulse ${className}`}
    >
      {/* Image Skeleton */}
      <div className="w-full h-[68%] bg-zinc-300" />

      {/* Info Section */}
      <div className="h-[32%] p-5 flex flex-col justify-between bg-white">
        {/* Title and Description */}
        <div className="space-y-2">
          <div className="h-5 w-[60%] bg-zinc-300 rounded" />
          <div className="h-4 w-[80%] bg-zinc-300 rounded" />
        </div>

        {/* Button */}
        <div className="mt-4 md:mt-2 w-full flex justify-center">
          <div className="w-[70%] h-10 bg-zinc-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;

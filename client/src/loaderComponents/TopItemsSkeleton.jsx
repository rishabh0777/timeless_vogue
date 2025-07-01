import React from 'react';

const TopItemsSkeleton = () => {
  return (
    <div className="w-full min-h-[150svh] relative animate-pulse">
      <div className="w-[90%] min-h-[80vh] absolute top-[15vh] left-1/2 transform -translate-x-1/2 rounded-xl">
        <div className="h-[4vw] w-[40%] mx-auto bg-zinc-300 rounded mb-8"></div>
        <div className="w-full h-[80%] grid grid-cols-3 items-center place-items-center gap-2 mt-[8vh]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-[90%] h-[25vh] bg-zinc-300 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopItemsSkeleton;

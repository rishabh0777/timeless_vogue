import React from "react";

const TopItemsSkeleton = () => {
  return (
    <div className="w-full sm:min-h-[80svh] md:min-h-[160vh] relative animate-pulse">
      <div className="w-[90%] absolute md:top-[15vh] left-1/2 transform -translate-x-1/2">
        <div className="h-12 w-1/2 bg-zinc-300 mx-auto rounded mb-10"></div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full h-[400px] bg-zinc-200 rounded-xl"></div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex gap-4 overflow-x-auto px-4 py-6 snap-x snap-mandatory scrollbar-hide">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[75vw] h-[350px] bg-zinc-200 rounded-xl snap-center"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopItemsSkeleton;

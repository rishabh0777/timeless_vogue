import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="w-full min-h-[80vh] relative animate-pulse">
      <div className="w-[90%] absolute md:top-[15vh] sm:top-[3vh] left-1/2 transform -translate-x-1/2">
        <div className="h-12 w-1/2 bg-zinc-300 mx-auto rounded mb-10"></div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[300px] w-full bg-zinc-200 rounded-xl"></div>
          ))}
        </div>

        {/* Mobile Scroll View */}
        <div className="md:hidden flex overflow-x-auto gap-4 px-6 py-6 snap-x snap-mandatory scrollbar-hide">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[75vw] h-[300px] bg-zinc-200 rounded-xl snap-center"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySkeleton;

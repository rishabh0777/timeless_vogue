import React from "react";

const ShopSkeleton = () => {
  return (
    <div className="w-full min-h-screen pt-[12vh] px-4 animate-pulse">
      {/* Header */}
      <div className="w-[50%] h-10 mx-auto bg-zinc-200 rounded mb-6" />

      {/* Filters */}
      <div className="hidden md:flex justify-between mb-6 max-w-[90%] mx-auto">
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-24 h-6 bg-zinc-200 rounded" />
          ))}
        </div>
        <div className="w-32 h-8 bg-zinc-200 rounded" />
      </div>

      {/* Product Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-[90vw] sm:w-[90vw] md:w-[24vw] h-[55vh] bg-zinc-200 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default ShopSkeleton;

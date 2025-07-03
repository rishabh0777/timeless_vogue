import React from "react";

const ShopSkeleton = () => {
  return (
    <div className="w-full min-h-[100vh] pt-[12vh] px-4 md:px-10">
      {/* Simulated filter header */}
      <div className="max-w-[1200px] mx-auto mb-10">
        <div className="h-10 w-40 bg-zinc-200 rounded mb-4 animate-pulse"></div>
        <div className="flex gap-4 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-zinc-200 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg p-4 animate-pulse bg-white shadow-sm">
            <div className="w-full h-48 bg-zinc-200 rounded mb-4"></div>
            <div className="h-4 w-3/4 bg-zinc-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-zinc-200 rounded mb-4"></div>
            <div className="h-10 w-full bg-zinc-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopSkeleton;

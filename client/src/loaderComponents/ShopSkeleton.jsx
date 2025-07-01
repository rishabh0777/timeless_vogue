import React from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ShopSkeleton = () => {
  return (
    <div className="w-full min-h-screen pt-[10vh] bg-white">
      {/* Title and Category Filters */}
      <div className="w-full h-[25vh] fixed bg-white py-4 text-center text-[4vw] z-50 shadow">
        <div className="w-full px-12">
          <div className="h-[6vh] w-[20vw] mx-auto bg-zinc-200 animate-pulse rounded mb-4" />
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-6 w-16 bg-zinc-200 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-8 w-24 bg-zinc-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="w-full absolute top-[30vh] py-10 px-12 grid grid-cols-3 gap-4 justify-items-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default ShopSkeleton;

import React from 'react';

const ProductCardSkeleton = ({ className }) => {
  return (
    <div className={`bg-zinc-300 w-[25vw] min-h-[51vh] relative overflow-hidden rounded-lg animate-pulse ${className}`}>
      {/* Image skeleton */}
      <div className="absolute top-0 left-0 w-full h-full bg-zinc-300" />

      {/* Bottom overlay skeleton */}
      <div className="absolute bottom-0 w-full h-[60%] bg-zinc-400/60 backdrop-blur-md p-4 flex flex-col justify-center items-center text-center">
        <div className="h-4 w-[60%] bg-zinc-300 rounded mb-2" />
        <div className="h-3 w-[80%] bg-zinc-300 rounded mb-4" />
      </div>

      {/* Button skeleton */}
      <div className="absolute left-1/2 bottom-[1vh] transform -translate-x-1/2 h-10 w-[60%] bg-white rounded-full" />
    </div>
  );
};

export default ProductCardSkeleton;

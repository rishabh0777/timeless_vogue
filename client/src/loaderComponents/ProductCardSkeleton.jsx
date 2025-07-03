import React from 'react';

const ProductCardSkeleton = ({ className }) => {
  return (
    <div
      className={`bg-zinc-200 w-[90vw] sm:w-[70vw] h-[50vh] md:w-[25vw] aspect-[3/4] rounded-lg overflow-hidden relative flex flex-col justify-end animate-pulse ${className}`}
    >
      {/* Product Image Placeholder */}
      <div className="w-full h-full bg-zinc-300" />

      {/* Info Overlay */}
      <div className="absolute bottom-0 w-full px-4 py-3 flex flex-col gap-2 bg-black/10 backdrop-blur-sm">
        <div className="h-5 w-[60%] bg-zinc-400 rounded" />
        <div className="h-4 w-[80%] bg-zinc-400 rounded" />
      </div>

      {/* Button */}
      <div className="absolute bottom-[1vh] left-1/2 transform -translate-x-1/2 w-[70%] h-10 bg-zinc-300 rounded-full" />
    </div>
  );
};

export default ProductCardSkeleton;

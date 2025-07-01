// loaderComponents/CartSkeleton.jsx
import React from "react";

const CartSkeleton = () => {
  return (
    <div className="w-full min-h-[100vh] pt-[10vh] px-4 md:px-12 animate-pulse">
      {/* Heading */}
      <div className="h-10 bg-zinc-300 rounded w-1/3 mx-auto mb-10" />

      {/* Cart Items */}
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center py-6 "
        >
          <div className="col-span-2 flex gap-4 items-center">
            <div className="w-20 h-20 bg-zinc-300 rounded" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 bg-zinc-300 rounded w-3/4" />
              <div className="h-3 bg-zinc-200 rounded w-1/2" />
              <div className="h-3 bg-zinc-200 rounded w-1/3" />
            </div>
          </div>
          <div className="h-4 bg-zinc-300 rounded w-12 mx-auto" />
          <div className="h-4 bg-zinc-300 rounded w-12 mx-auto" />
          <div className="h-4 bg-zinc-300 rounded w-16 mx-auto" />
        </div>
      ))}

      {/* Address Section */}
      <div className="mt-10">
        <div className="h-6 w-1/4 bg-zinc-300 rounded mb-4" />
        <div className="flex flex-wrap gap-4 justify-center">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="w-[30%] min-w-[250px] p-4 rounded-lg bg-zinc-100 space-y-2">
              <div className="h-4 bg-zinc-300 rounded w-2/3" />
              <div className="h-3 bg-zinc-200 rounded w-3/4" />
              <div className="h-3 bg-zinc-200 rounded w-2/4" />
              <div className="h-3 bg-zinc-200 rounded w-1/2" />
              <div className="flex justify-between mt-2">
                <div className="h-3 w-10 bg-zinc-300 rounded" />
                <div className="h-3 w-12 bg-zinc-300 rounded" />
              </div>
            </div>
          ))}
          <div className="w-[15vw] h-[12vh] bg-zinc-200 rounded-md flex items-center justify-center">
            <div className="h-4 w-1/2 bg-zinc-400 rounded" />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="w-full flex justify-center mt-10">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6  space-y-4">
          <div className="h-6 w-1/2 bg-zinc-300 rounded" />
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex justify-between items-center pb-2">
              <div className="w-2/3 space-y-1">
                <div className="h-4 bg-zinc-300 rounded w-3/4" />
                <div className="h-3 bg-zinc-200 rounded w-1/2" />
              </div>
              <div className="h-4 bg-zinc-300 rounded w-12" />
            </div>
          ))}

          <div className="space-y-1">
            <div className="h-5 bg-zinc-300 rounded w-1/3" />
            <div className="h-3 bg-zinc-200 rounded w-1/2" />
            <div className="h-3 bg-zinc-200 rounded w-2/4" />
            <div className="h-3 bg-zinc-200 rounded w-1/3" />
          </div>

          <div className="flex justify-between items-center">
            <div className="h-5 w-1/4 bg-zinc-300 rounded" />
            <div className="h-6 w-20 bg-zinc-400 rounded" />
          </div>

          <div className="h-12 w-full bg-zinc-300 rounded mt-4" />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;

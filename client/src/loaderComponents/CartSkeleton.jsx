import React from "react";

const CartSkeleton = () => {
  return (
    <div className="w-full min-h-[200vh] pt-[10vh] px-4 md:px-12 animate-pulse">
      <div className="h-8 w-40 bg-zinc-300 rounded mb-8 mx-auto" />

      {/* Skeleton for 2 cart items */}
      {[1, 2].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center py-6 border-t border-zinc-200"
        >
          {/* Product Image + Title */}
          <div className="col-span-2 flex gap-4 items-center">
            <div className="w-20 h-20 bg-zinc-300 rounded" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-3/4 bg-zinc-300 rounded" />
              <div className="h-3 w-1/2 bg-zinc-300 rounded" />
              <div className="h-3 w-20 bg-zinc-300 rounded" />
            </div>
          </div>

          {/* Price */}
          <div className="text-center">
            <div className="h-4 w-12 mx-auto bg-zinc-300 rounded" />
          </div>

          {/* Quantity */}
          <div className="flex justify-center">
            <div className="flex gap-2 items-center">
              <div className="h-8 w-8 bg-zinc-300 rounded" />
              <div className="h-4 w-4 bg-zinc-300 rounded" />
              <div className="h-8 w-8 bg-zinc-300 rounded" />
            </div>
          </div>

          {/* Subtotal */}
          <div className="text-center">
            <div className="h-4 w-16 mx-auto bg-zinc-300 rounded" />
          </div>
        </div>
      ))}

      {/* Total Amount Box */}
      <div className="mt-6 flex justify-end">
        <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[30%] bg-zinc-200 rounded-lg p-4 space-y-3">
          <div className="h-5 w-1/2 bg-zinc-300 rounded" />
          <div className="h-3 w-3/4 bg-zinc-300 rounded" />
        </div>
      </div>

      {/* Address Skeleton */}
      <div className="mt-10">
        <div className="h-6 w-60 bg-zinc-300 rounded mb-6" />
        <div className="flex flex-wrap gap-5 justify-center">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="w-[30%] min-w-[250px] border border-zinc-300 p-4 rounded-lg space-y-2"
            >
              <div className="h-4 w-3/4 bg-zinc-300 rounded" />
              <div className="h-3 w-2/3 bg-zinc-300 rounded" />
              <div className="h-3 w-1/2 bg-zinc-300 rounded" />
              <div className="h-3 w-1/3 bg-zinc-300 rounded" />
              <div className="flex justify-between mt-3">
                <div className="h-3 w-10 bg-zinc-300 rounded" />
                <div className="h-3 w-10 bg-zinc-300 rounded" />
              </div>
            </div>
          ))}

          {/* Add Address Placeholder */}
          <div className="w-[30%] min-w-[250px] h-[150px] bg-zinc-300 rounded flex items-center justify-center">
            <div className="h-5 w-1/2 bg-zinc-400 rounded" />
          </div>
        </div>
      </div>

      {/* Payment Skeleton */}
      <div className="w-full mt-10">
        <div className="h-6 w-48 bg-zinc-300 rounded mb-4" />
        <div className="w-full h-32 bg-zinc-200 rounded-lg" />
      </div>
    </div>
  );
};

export default CartSkeleton;

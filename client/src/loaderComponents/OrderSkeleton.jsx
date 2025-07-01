import React from "react";

const OrderSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="border border-zinc-200 rounded-lg p-6 shadow-md bg-white"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-[40%] bg-zinc-300 rounded" />
            <div className="h-6 w-[20%] bg-zinc-300 rounded-full" />
          </div>

          <div className="grid gap-2">
            <div className="h-4 w-[90%] bg-zinc-200 rounded" />
            <div className="h-4 w-[85%] bg-zinc-200 rounded" />
            <div className="h-4 w-[80%] bg-zinc-200 rounded" />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <div className="h-3 w-16 bg-zinc-300 rounded mb-2" />
              <div className="h-5 w-24 bg-zinc-300 rounded" />
            </div>

            <div className="flex gap-4">
              <div className="h-8 w-28 bg-zinc-300 rounded" />
              <div className="h-8 w-28 bg-zinc-300 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSkeleton;

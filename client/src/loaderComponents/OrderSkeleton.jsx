import React from "react";

const OrderSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {Array.from({ length: 2 }).map((_, idx) => (
        <div key={idx} className="border border-zinc-200 rounded-lg p-6 shadow-md bg-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div className="h-5 bg-zinc-300 rounded w-[60%]"></div>
            <div className="h-5 bg-zinc-300 rounded w-[30%]"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-zinc-300 rounded w-full"></div>
            <div className="h-4 bg-zinc-300 rounded w-[80%]"></div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
            <div className="space-y-1">
              <div className="h-4 bg-zinc-300 rounded w-20"></div>
              <div className="h-5 bg-zinc-300 rounded w-32"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="h-8 bg-zinc-300 rounded w-full sm:w-32"></div>
              <div className="h-8 bg-zinc-300 rounded w-full sm:w-32"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSkeleton;

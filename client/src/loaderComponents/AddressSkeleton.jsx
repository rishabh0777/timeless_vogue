import React from "react";

const AddressSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 animate-pulse">
      <div className="bg-white max-w-xl w-full p-8 shadow-md rounded space-y-6">
        <div className="h-6 w-1/2 bg-zinc-300 rounded mx-auto" />

        {[1, 2, 3].map((_, i) => (
          <div key={i} className="h-10 bg-zinc-200 rounded w-full" />
        ))}

        <div className="flex gap-4">
          <div className="h-10 bg-zinc-200 rounded w-1/2" />
          <div className="h-10 bg-zinc-200 rounded w-1/2" />
        </div>

        <div className="flex gap-4">
          <div className="h-10 bg-zinc-200 rounded w-1/2" />
          <div className="h-10 bg-zinc-200 rounded w-1/2" />
        </div>

        <div className="h-12 bg-zinc-300 rounded w-full" />
      </div>
    </div>
  );
};

export default AddressSkeleton;

import React from "react";

const NavbarSkeleton = () => {
  return (
    <div className="w-full h-[10vh] px-4 md:px-12 fixed top-0 bg-white z-[1000] shadow-lg animate-pulse flex items-center justify-between">
      {/* Brand */}
      <div className="h-6 w-[30%] md:w-[15%] bg-zinc-200 rounded"></div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-4 w-16 bg-zinc-200 rounded" />
        ))}
      </ul>

      {/* Search and Actions */}
      <div className="flex gap-4 items-center">
        {/* Search bar (only desktop) */}
        <div className="hidden md:block w-[20vw] h-8 bg-zinc-200 rounded"></div>

        {/* Cart icon */}
        <div className="h-6 w-6 bg-zinc-200 rounded-full" />

        {/* User section */}
        <div className="hidden md:flex gap-2">
          <div className="h-6 w-6 bg-zinc-200 rounded-full" />
          <div className="h-4 w-16 bg-zinc-200 rounded" />
        </div>

        {/* Mobile menu */}
        <div className="md:hidden h-6 w-6 bg-zinc-200 rounded" />
      </div>
    </div>
  );
};

export default NavbarSkeleton;

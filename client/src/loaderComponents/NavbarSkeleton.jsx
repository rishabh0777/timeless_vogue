import React from 'react';

const NavbarSkeleton = () => {
  return (
    <nav className="w-full h-[10vh] px-12 flex items-center justify-between fixed top-0 bg-white z-[1000] shadow-lg animate-pulse">
      {/* Logo */}
      <div className="h-6 w-[10vw] bg-zinc-300 rounded"></div>

      {/* Nav links */}
      <ul className="flex gap-[5vw]">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="h-4 w-[5vw] bg-zinc-300 rounded"></li>
        ))}
      </ul>

      {/* Search bar */}
      <div className="flex gap-[1vw] relative">
        <div className="w-[20vw] h-8 bg-zinc-300 rounded-lg" />
        <div className="w-6 h-6 bg-zinc-300 rounded-full absolute right-[1vw] top-1/2 transform -translate-y-1/2" />
      </div>

      {/* Icons */}
      <div className="flex gap-[3vw] items-center">
        {/* Cart Icon */}
        <div className="relative w-6 h-6 bg-zinc-300 rounded-full" />
        {/* User Icon & Name */}
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-zinc-300 rounded-full" />
          <div className="w-[6vw] h-4 bg-zinc-300 rounded" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarSkeleton;

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-[#524158] via-[#2f394c] to-[#121312] text-white overflow-hidden">

      {/* Floating glow background */}
      <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(rgba(255,255,255,0.05),transparent)] rounded-full glow -top-40 -left-40 pointer-events-none z-0" />

      <h1 className="text-[7rem] leading-none font-serif font-bold text-white fade-up z-10">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl mt-4 font-serif font-semibold fade-up delay-1 z-10">
        Elegance Misplaced.
      </h2>
      <p className="mt-4 max-w-lg text-gray-300 fade-up delay-2 z-10">
        The page you’re looking for has stepped off the runway.<br />
        But timeless style always circles back.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block border-2 border-white px-6 py-2 rounded-full text-white font-semibold hover:bg-white hover:text-black transition-all fade-up delay-3 z-10"
      >
        ⟵ Return to Vogue
      </Link>
    </div>
  );
};

export default NotFound;

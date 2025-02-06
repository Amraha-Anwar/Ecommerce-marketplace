import React from "react";
import { Loader as Spinner } from "lucide-react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative flex items-center justify-center">
        {/* Glowing outer ring */}
        <div className="absolute w-32 h-32 rounded-full border-8 border-blue-500 opacity-30 animate-pulse"></div>

        {/* Spinning outer border */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-red-500 border-opacity-90"></div>

        {/* Inner rotating ring */}
        <div className="absolute h-28 w-28 rounded-full border-t-4 border-b-4 border-yellow-500 border-opacity-70 animate-spin-slow"></div>

        {/* Unique Center Icon */}
        <div className="absolute flex items-center justify-center text-customBlue">
          <Spinner size={50} className="opacity-90 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Loader;

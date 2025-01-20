"use client";

import Link from "next/link";

export default function BottomNavbar() {
  return (
    <nav className="w-full border-b hidden sm:block"> {/* Hidden on mobile */}
      <div className="max-w-screen-2xl mx-auto h-14 lg:h-20 flex justify-between items-center lg:px-28 px-3">
        {/* Links */}
        <ul className="flex gap-3 lg:gap-7 text-sm text-gray-600">
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200" href={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200" href={"/shopPage"}>
              Shop
            </Link>
          </li>
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200" href={"/products"}>
              Product
            </Link>
          </li>
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200" href={"/about"}>
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200" href={"/contact"}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Contact */}
        <div className="hidden lg:block">
          <p className="text-gray-500">
            Contact: <span className="text-black">(808) 555-0111</span>
          </p>
        </div>
      </div>
    </nav>
  );
}
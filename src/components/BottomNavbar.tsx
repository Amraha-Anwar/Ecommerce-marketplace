import Link from "next/link";

export default function BottomNavbar() {
  return (
    <nav className="w-full border-b hidden sm:block"> {/* Hidden on mobile */}
      <div className="max-w-screen-2xl mx-auto h-14 lg:h-20 flex justify-between items-center lg:px-28 px-3 font-semibold">
        {/* Links */}
        <ul className="flex gap-3 lg:gap-7 text-sm text-gray-600">
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200 relative group" href={"/"}>
              Home
              <span className="absolute left-0 bottom-0 h-0.5 bg-customTeal w-0 group-hover:w-full transition-all duration-200"></span>
            </Link>
          </li>
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200 relative group" href={"/shopPage"}>
              Shop
              <span className="absolute left-0 bottom-0 h-0.5 bg-customTeal w-0 group-hover:w-full transition-all duration-200"></span>
            </Link>
          </li>
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200 relative group" href={"/products"}>
              Product
              <span className="absolute left-0 bottom-0 h-0.5 bg-customTeal w-0 group-hover:w-full transition-all duration-200"></span>
            </Link>
          </li>
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200 relative group" href={"/about"}>
              About
              <span className="absolute left-0 bottom-0 h-0.5 bg-customTeal w-0 group-hover:w-full transition-all duration-200"></span>
            </Link>
          </li>
          <li>
            <Link className="hover:text-customTeal transition-colors duration-200 relative group" href={"/contact"}>
              Contact
              <span className="absolute left-0 bottom-0 h-0.5 bg-customTeal w-0 group-hover:w-full transition-all duration-200"></span>
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
"use client";

import { Heart, Menu } from "lucide-react"; // Added Menu icon
import Image from "next/image";
import Link from "next/link";
import { BsCartDash } from "react-icons/bs";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useState } from "react";
import Search from "@/components/Search";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MiddleNavbar() {
  const { cartCount, handleCartClick } = useShoppingCart();
  const [wishlistCount, setWishlistCount] = useState(0);

  // Fetch wishlist count from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
      setWishlistCount(wishlist.length);
    }
  }, []);

  return (
    <nav className="max-w-screen-2xl mx-auto bg-customGray shadow-sm">
      <div className=" h-16 lg:h-20 px-3 lg:px-28 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            className="w-8 h-8 lg:w-10 lg:h-10 hover:scale-105 transition-transform duration-200"
            src={"/images/logo.png"}
            alt="Logo"
            width={200}
            height={200}
          />
          <h1 className="text-xl max-sm:text-lg font-bold text-gray-800 hover:text-customTeal transition-colors duration-200">
            Comforty
          </h1>
        </div>

        {/* Search Component */}
        <div className="flex items-center gap-x-3 max-sm:gap-x-2">
          <Search />

          {/* Menu Bar for Mobile */}
          <div className="hidden max-sm:block">
            <Sheet>
              <SheetTrigger>
                <Menu className="w-6 h-6 text-gray-600 hover:text-customTeal transition-colors duration-200" />
              </SheetTrigger>
              <SheetContent side="right" className="pt-12">
                {/* Mobile Links */}
                <ul className="space-y-4">
                  <li>
                    <Link
                      href={"/"}
                      className="block text-gray-600 hover:text-customTeal transition-colors duration-200 hover:pl-2"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/shopPage"}
                      className="block text-gray-600 hover:text-customTeal transition-colors duration-200 hover:pl-2"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/products"}
                      className="block text-gray-600 hover:text-customTeal transition-colors duration-200 hover:pl-2"
                    >
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/about"}
                      className="block text-gray-600 hover:text-customTeal transition-colors duration-200 hover:pl-2"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/contact"}
                      className="block text-gray-600 hover:text-customTeal transition-colors duration-200 hover:pl-2"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>

                {/* Wishlist Button */}
                <div className="mt-6">
                  <Link href={"/wishlist"}>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-customTeal transition-colors duration-200 hover:pl-2">
                      <Heart className="w-5 h-5" />
                      <span>Wishlist</span>
                      <span className="bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold">
                        {wishlistCount}
                      </span>
                    </button>
                  </Link>
                </div>

                {/* Cart Button */}
                <div className="mt-4">
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-customTeal transition-colors duration-200 hover:pl-2"
                    onClick={() => handleCartClick()}
                  >
                    <BsCartDash className="w-5 h-6" />
                    <span>Cart</span>
                    <span className="bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold">
                      {cartCount || 0}
                    </span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Wishlist and Cart buttons (for larger screens) */}
          <div className="max-sm:hidden flex items-center gap-x-3">
            {/* Wishlist button */}
            <div className="bg-white rounded-lg px-2 sm:px-3 py-3 relative hover:shadow-md transition-shadow duration-200">
              <Link href={"/wishlist"}>
                <button className="flex items-center">
                  <Heart className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
                  {/* Badge for wishlist count */}
                  <span className="absolute -top-2 -right-2 bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold hover:scale-105 transition-transform duration-200">
                    {wishlistCount}
                  </span>
                </button>
              </Link>
            </div>

            {/* Cart button */}
            <div className="bg-white rounded-lg lg:px-3 px-1 py-1 hover:shadow-md transition-shadow duration-200">
              <button
                className="relative flex items-center gap-2 sm:gap-1 rounded-[10px] px-2 py-2 lg:px-3 lg:py-2 hover:scale-105 transition-transform duration-200"
                onClick={() => handleCartClick()}
              >
                <BsCartDash className="w-5 h-6 hover:scale-110 transition-transform duration-200" />
                {/* Cart text for large screens */}
                <span className="hidden sm:block">Cart</span>
                {/* Badge to show cart count */}
                <span className="absolute -top-2 -right-2 bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold hover:scale-105 transition-transform duration-200">
                  {cartCount || 0}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
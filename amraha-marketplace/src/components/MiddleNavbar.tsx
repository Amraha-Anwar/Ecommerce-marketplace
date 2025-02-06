"use client";

import { Heart, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsCartDash } from "react-icons/bs";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useState } from "react";
import Search from "@/components/Search";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut, SignInButton, useUser, UserButton } from "@clerk/nextjs";
import { FaUser } from "react-icons/fa6";

export default function MiddleNavbar() {
  const { cartCount, handleCartClick } = useShoppingCart();
  const [wishlistCount, setWishlistCount] = useState(0);
  const { user:_user } = useUser(); 
  
  useEffect(() => {
    const updateWishlistCount = () => {
      const savedWishlist = localStorage.getItem("wishlist");
      setWishlistCount(savedWishlist ? JSON.parse(savedWishlist).length : 0);
    };

    updateWishlistCount();

    const observer = new MutationObserver(updateWishlistCount);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="max-w-screen-2xl mx-auto bg-customGray shadow-sm sticky top-0 bg-white z-50">
      <div className="h-16 lg:h-20 px-3 lg:px-28 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            className="w-8 h-8 lg:w-10 lg:h-10 hover:scale-105 transition-transform duration-200"
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={200}
          />
          <h1 className="hidden sm:block text-xl max-sm:text-lg font-bold text-gray-800 hover:text-customTeal transition-colors duration-200">
            Comforty
          </h1>
        </div>

        {/* Large Screens: Wishlist, Cart, Search Bar, and Avatar/Sign-In Button */}
        <div className="max-sm:hidden flex items-center gap-x-3">
          <Search />

          <div className="bg-white rounded-lg px-2 sm:px-3 py-3 relative hover:shadow-md transition-shadow duration-200">
            <Link href="/wishlist">
              <button className="flex items-center">
                <Heart className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
                <span className="absolute -top-2 -right-2 bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold hover:scale-105 transition-transform duration-200">
                  {wishlistCount}
                </span>
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-lg lg:px-3 px-1 py-1 hover:shadow-md transition-shadow duration-200">
            <button className="relative flex items-center gap-2 sm:gap-1 rounded-[10px] px-2 py-2 lg:px-3 lg:py-2 hover:scale-105 transition-transform duration-200" onClick={() => handleCartClick()}>
              <BsCartDash className="w-5 h-6 hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:block">Cart</span>
              <span className="absolute -top-2 -right-2 bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold hover:scale-105 transition-transform duration-200">
                {cartCount || 0}
              </span>
            </button>
          </div>

          {/* Signed-in users: Show default Clerk UserButton */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Signed-out users: Show styled sign-in button */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-customTeal to-customDarkBlue text-white font-semibold hover:scale-105 hover:shadow-md transition-all duration-200 active:scale-95">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Small Screens: Search Bar, Avatar/Sign-In Button, and Sheet Menu */}
        <div className="sm:hidden flex items-center gap-x-3">
          <Search />

          {/* Signed-in users: Show default Clerk UserButton */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Signed-out users: Show styled sign-in button */}
          <SignedOut>
            <SignInButton>
              <button className="px-2 py-2 rounded-full bg-gradient-to-r from-customTeal to-customDarkBlue text-white font-semibold hover:scale-105 hover:shadow-md transition-all duration-200 active:scale-95">
              <FaUser />
              </button>
            </SignInButton>
          </SignedOut>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-gray-600 hover:text-customTeal transition-colors duration-200" />
            </SheetTrigger>
            <SheetContent side="right" className="pt-12 font-semibold">
              <ul className="space-y-4">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/shopPage">Shop</Link></li>
                <li><Link href="/products">Product</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
              <div className="mt-6">
                <Link href="/wishlist">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-customTeal transition-colors duration-200 hover:pl-2">
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                    <span className="bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold">{wishlistCount}</span>
                  </button>
                </Link>
              </div>
              <div className="mt-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-customTeal transition-colors duration-200 hover:pl-2" onClick={() => handleCartClick()}>
                  <BsCartDash className="w-5 h-6" />
                  <span>Cart</span>
                  <span className="bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold">{cartCount || 0}</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
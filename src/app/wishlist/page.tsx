"use client";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";


interface ImageAsset {
    asset: {
      _ref: string;
      _type: string;
    };
  }

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image:ImageAsset;
  slug: string;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  if (wishlist.length === 0) {
    return (
      <div className="max-w-screen-lg mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mt-4">Start adding products to your wishlist!</p>
        <Link href="/" className="text-blue-500 underline mt-4 block">
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-5 sm:px-0 py-20">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item._id} className="border p-4 rounded-md">
            <img
              src={urlFor(item.image).url()}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-4">{item.name}</h2>
            <p className="text-gray-500 mt-2">${item.price}.00</p>
            <Link
              href={`/product/${item.slug}`}
              className="text-blue-500 underline mt-4 block"
            >
              View Product
            </Link>
            <button
              onClick={() => {
                const updatedWishlist = wishlist.filter((w) => w._id !== item._id);
                setWishlist(updatedWishlist);
                localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
              }}
              className="text-red-500 mt-2 underline"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

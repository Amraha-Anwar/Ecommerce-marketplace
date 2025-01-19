"use client";

import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  slug: string;
  price_id: string;
  inventory: number;
  badge?: string;
}

export default function ProductDetails({ product }: { product: Product }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const handleAddToWishlist = () => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist, product];
      return updatedWishlist;
    });
    toast.success(`${product.title} has been added to your wishlist!`);
  };

  const handleAddToCartMessage = () => {
    toast.success(`${product.title} has been added to the cart!`);
  };

  // Debugging: Log the image object
  useEffect(() => {
    console.log("Product Image:", product.image);
  }, [product.image]);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-20 md:gap-10 xl:gap-20">
      <div className="md:w-[50%]">
        {product.image && (
          <Image
            src={urlFor(product.image).url()}
            alt={product.title}
            width={800}
            height={800}
          />
        )}
        {/* Display Badge */}
        {product.badge && (
          <div
            className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-full ${
              product.badge.toLowerCase() === "new"
                ? "bg-green-600"
                : product.badge.toLowerCase() === "sales"
                ? "bg-orange-500"
                : "bg-gray-600"
            }`}
          >
            {product.badge}
          </div>
        )}
      </div>

      <div className="md:w-[50%]">
        <h1 className="text-customBlue text-3xl sm:text-5xl md:text-4xl xl:text-7xl font-bold -mt-10 md:-mt-0">
          {product.title}
        </h1>
        <div className="flex items-center gap-3 my-5">
          <p className="bg-customTeal text-white font-semibold lg:text-xl px-4 py-2 rounded-full">
            ${product.price}.00 USD
          </p>
          {product.priceWithoutDiscount && (
            <p className="text-gray-500 line-through text-sm">
              ${product.priceWithoutDiscount}.00 USD
            </p>
          )}
        </div>
        <hr />
        <h2 className="my-10 md:my-5 lg:my-10 text-gray-600 font-medium">
          {product.description}
        </h2>

        {product.inventory > 0 ? (
          <p className="text-gray-500 font-semibold mb-3 text-sm">
            Availability:
            <span className="text-green-500 font-semibold mb-3 text-sm">
              {" "}
              In Stock {product.inventory}{" "}
            </span>
          </p>
        ) : (
          <p className="text-gray-500 font-semibold text-sm">
            Availability:
            <span className="text-red-500 font-semibold text-sm">
              {" "}
              Out of Stock
            </span>
          </p>
        )}

        {product.inventory > 0 ? (
          <AddToCart
            currency="USD"
            name={product.title}
            description={product.description}
            image={product.image}
            price={product.price}
            key={product._id}
            price_id={product.price_id}
            onAddToCart={handleAddToCartMessage}
          />
        ) : (
          <button
            onClick={handleAddToWishlist}
            className="bg-customTeal text-white py-2 px-5 rounded-full mt-5"
          >
            Add To Wishlist
          </button>
        )}
      </div>
    </div>
  );
}
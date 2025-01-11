"use client";

import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import toast from "react-hot-toast";

interface ImageAsset {
  asset: {
    _ref: string;
    _type: string;
  };
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: ImageAsset;
  slug: string;
  price_id: string;
  stock: number;
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
    toast.success(`${product.name} has been added to your wishlist!`);
  };

  const handleAddToCartMessage = () => {
    toast.success(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-20 md:gap-10 xl:gap-20">
      <div className="md:w-[50%]">
        <Image
          src={urlFor(product.image).url()}
          alt={product.name}
          width={800}
          height={800}
        />
      </div>

      <div className="md:w-[50%]">
        <h1 className="text-customBlue text-3xl sm:text-5xl md:text-4xl xl:text-7xl font-bold -mt-10 md:-mt-0">
          {product.name}
        </h1>
        <p className="bg-customTeal text-white font-semibold lg:text-xl w-[50%] sm:w-[40%] md:w-[40%] flex justify-center py-2 my-10 md:my-5 lg:my-10 rounded-full">
          ${product.price}.00 USD
        </p>
        <hr />
        <h2 className="my-10 md:my-5 lg:my-10 text-gray-600 font-medium">
          {product.description}
        </h2>

        {product.stock > 0 ? (
          <p className="text-green-500 font-semibold mb-3">
            Quantity in stock: {product.stock}
          </p>
        ) : (
          <p className="text-red-500 font-semibold">Out of Stock</p>
        )}

        {product.stock > 0 ? (
          <AddToCart
            currency="USD"
            name={product.name}
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

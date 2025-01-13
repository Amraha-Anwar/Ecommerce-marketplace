"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import AddToCart2 from "@/components/AddToCart2";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
  imageURL: string;
  stock: number;
  price_id:string,
}

async function getFeaturedProducts() {
  const query = `*[_type == "product"][0...4] | order(_createdAt asc) {
    _id,
    name,
    price,
    "slug": slug.current,
    "imageURL": image.asset->url,
    stock,
    price_id
  }`;
  const products = await client.fetch(query);
  return products;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const featuredProducts = await getFeaturedProducts();
      setProducts(featuredProducts);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // Ensure the function is only called once
    if (product.stock > 0) {
      console.log("Product added to cart:", product);
    }
  };

  return (
    <main className="max-w-screen-2xl mx-auto overflow-x-hidden lg:px-28">
      <h1 className="lg:text-3xl text-xl sm:text-2xl text-center lg:text-left font-bold text-customBlue pb-4 sm:pb-6 lg:pb-10">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 px-4 overflow-hidden">
        {products.map((product) => (
          <div key={product._id} className="group relative">
            <div className="aspect-square w-full overflow-hidden rounded-md hover:scale-105 transition-transform duration-300 lg:h-80">
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.imageURL}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover object-center"
                />
              </Link>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h1 className="text-customTeal pt-2">{product.name}</h1>
                <p className="text-lg font-medium">${product.price}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => handleAddToCart(product)} // Ensure this logic is correct
                  disabled={product.stock === 0} // Disable button if out of stock
                  className={`${
                    product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <AddToCart2
                    name={product.name}
                    description={`High-quality ${product.name}`}
                    price={product.price}
                    currency="USD"
                    image={product.imageURL}
                    price_id={product.price_id}
                  />
                </button>
                {product.stock === 0 && (
                  <div className="absolute bottom-0 left-0 w-full bg-black text-white text-xs py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import AddToCart2 from "@/components/AddToCart2";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  title: string;
  price: number;
  slug: string;
  imageURL: string;
  inventory: number;
  price_id: string;
  badge?: string;
  priceWithoutDiscount?: number; 
}

async function getFeaturedProducts() {
  const query = `*[_type == "products" && "featured" in tags] | order(badge asc) {
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "imageURL": image.asset->url,
    inventory,
    "slug": slug.current,
    tags
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
    if (product.inventory > 0) {
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
            <div className="aspect-square w-full overflow-hidden rounded-md hover:scale-105 transition-transform duration-300 lg:h-80 relative">
              {/* Badge */}
              {product.badge && (
                <div
                  className={`absolute top-2 left-2 px-3 py-1 text-sm font-semibold text-white rounded-md z-10 ${
                    product.badge.toLowerCase() === "new"
                      ? "bg-green-500"
                      : product.badge.toLowerCase() === "sales"
                      ? "bg-orange-500"
                      : "bg-gray-500"
                  }`}
                >
                  {product.badge}
                </div>
              )}
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.imageURL}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover object-center"
                />
              </Link>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h1 className="text-customTeal pt-2">{product.title}</h1>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-medium">${product.price}</p>
                  {product.priceWithoutDiscount && (
                    <p className="text-lg text-gray-500 line-through">
                      ${product.priceWithoutDiscount}
                    </p>
                  )}
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.inventory === 0}
                  className={`${
                    product.inventory === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <AddToCart2
                    name={product.title}
                    description={`High-quality ${product.title}`}
                    price={product.price}
                    currency="USD"
                    image={product.imageURL}
                    price_id={product.price_id}
                  />
                </button>
                {product.inventory === 0 && (
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
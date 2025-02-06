"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  slug: string;
  imageURL: string; 
  title:string;
  price: number;
}

async function getFeaturedProducts() {
  const query = `*[_type == "products"] [0...5] | order(badge asc) {
    _id,
    title,
    price,
    priceWithoutDiscount,
    price_id,
    badge,
    "imageURL": image.asset->url,
    inventory,
    "slug": slug.current,
    tags
  }`;
  const products = await client.fetch(query);
  return products;
}

export default function DynamicFeatured() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const featuredProducts = await getFeaturedProducts();
      setProducts(featuredProducts);
    };

    fetchProducts();
  }, []);

  return (
    <main className="max-w-screen-2xl mx-auto overflow-x-hidden lg:px-28">
        <div className="flex justify-center sm:justify-between items-center my-10 lg:my-20 px-10 lg:px-0">
      <h1 className="lg:text-3xl text-xl sm:text-2xl lg:text-left font-semibold text-customBlue pb-4 sm:pb-6 lg:pb-10">
        FEATURED PRODUCTS 
      </h1>
      <Link href={"/products"} className="hidden sm:block text-black font-bold pb-4 sm:pb-6 lg:pb-10 underline underline-offset-8">View all</Link>
      </div>
      <div className="grid grid-cols-1 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 px-4 overflow-hidden">
        {products.map((product) => (
          <div key={product._id} className="group relative px-5 md:px-0">
            <div className="aspect-square  w-full overflow-hidden rounded-md hover:scale-105 transition-transform duration-300">
            
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
            <div className="flex justify-between items-center mt-4">
                <h1 className="text-black">{product.title}</h1>
                  <p className="text-lg font-medium">${product.price}</p>
                  </div>
          </div>
        ))}
      </div>
      <Link href={"/products"} className="block sm:hidden text-center text-black font-bold py-10  underline underline-offset-8">View all</Link>
    </main>
  );
}
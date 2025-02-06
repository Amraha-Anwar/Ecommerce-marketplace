"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import AddToCart2 from "@/components/AddToCart2";
import { useState, useEffect } from "react";

interface Items {
  _id: string;
  title: string;
  price: number;
  slug: string;
  imageURL: string;
  inventory: number;
  price_id: string;
  badge?: string; // Add badge field to the interface
  priceWithoutDiscount?: number; // Add priceWithoutDiscount field to the interface
}

async function getOurProducts() {
  const query = `*[_type == "products"] | order(price asc) [0...8] {
    _id,
    title,
    price,
    price_id,
    "slug": slug.current,
    "imageURL": image.asset->url,
    inventory,
    badge, 
    priceWithoutDiscount 
  }`;
  const items = await client.fetch(query);
  return items;
}

export default function OurProducts() {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getOurProducts();
      setItems(products);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (item: Items) => {
    if (item.inventory > 0) {
      // Handle adding in-stock products to the cart
      console.log(`${item.title} has been added to your cart!`);
    } else {
      // Handle out-of-stock products
      console.log(`${item.title} is out of stock.`);
    }
  };

  return (
    <>
      <main className="max-w-screen-2xl mx-auto overflow-x-hidden lg:px-28">
        <h1 className="text-customBlue text-center xl:text-left lg:text-3xl font-bold text-xl sm:text-2xl pb-3 lg:pb-10">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 lg:gap-y-16 px-4 md:px-10 lg:px-0 overflow-hidden">
          {items.map((item) => (
            <div key={item._id} className="group relative">
              <div className="w-full overflow-hidden rounded-md transition-transform duration-200 hover:scale-105">
                <Link href={`/product/${item.slug}`}>
                  <Image
                    src={item.imageURL}
                    alt={item.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover object-center"
                  />
                </Link>
                {/* Badge */}
                {item.badge && (
                  <div
                    className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-md ${
                      item.badge === "New"
                        ? "bg-green-600"
                        : item.badge === "Sales"
                        ? "bg-orange-500"
                        : "bg-gray-600"
                    }`}
                  >
                    {item.badge}
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h1 className="text-customTeal pt-2">{item.title}</h1>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium">${item.price}</p>
                    {item.priceWithoutDiscount && (
                      <p className="text-gray-500 line-through ">
                        ${item.priceWithoutDiscount}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={item.inventory === 0}
                    className={` ${
                      item.inventory === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <AddToCart2
                      name={item.title}
                      description={`High-quality ${item.title}`}
                      price={item.price}
                      currency="USD"
                      image={item.imageURL}
                      price_id={item.price_id}
                    />
                  </button>
                  {item.inventory === 0 && (
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
    </>
  );
}
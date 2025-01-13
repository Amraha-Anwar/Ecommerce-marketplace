"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AddToCart2 from "@/components/AddToCart2";

interface Items {
  _id: string;
  name: string;
  price: number;
  price_id: string;
  slug: string;
  imageURL: string;
  stock: number;
}

async function getOurProducts() {
  const query = `*[_type == "product"]{
    _id,
    name,
    price,
    price_id,
    "slug": slug.current,
    "imageURL": image.asset->url,
    stock
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
    if (item.stock > 0) {
      toast.success(`${item.name} has been added to your cart!`, {
        duration: 3000,
      });
    } else {
      toast.error(`${item.name} is out of stock.`, {
        duration: 3000,
      });
    }
  };

  return (
    <>
      <main className="max-w-screen-2xl mx-auto overflow-x-hidden py-10 lg:px-28">
        <h1 className="text-customBlue text-center xl:text-left lg:text-3xl font-bold text-xl sm:text-2xl pb-3 lg:pb-10">
          All Products
        </h1>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 lg:gap-y-16 px-4 md:px-10 lg:px-0 overflow-hidden">
            {items.map((item) => (
              <div key={item._id} className="group relative">
                <div className="w-full overflow-hidden rounded-md bg-white transition-transform duration-200 hover:scale-105 group-hover:opacity-75">
                  <Link href={`/product/${item.slug}`}>
                    <Image
                      src={item.imageURL}
                      alt={item.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover object-center"
                    />
                  </Link>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h1 className="text-customTeal pt-2">{item.name}</h1>
                    <p className="text-lg font-medium">${item.price}</p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === 0}
                      className={` ${
                        item.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <AddToCart2
                        name={item.name}
                        description={`High-quality ${item.name}`}
                        price={item.price}
                        currency="USD"
                        image={item.imageURL}
                        price_id={item.price_id}
                      />
                    </button>
                    {item.stock === 0 && (
                      <div className="absolute bottom-0 left-0 w-full bg-black text-white text-xs py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

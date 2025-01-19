"use client"; 

import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

// Defining the Category interface
interface Category {
  _id: string;
  title: string;
  imageURL: string;
  products: number;
}

// Fetching categories from Sanity
async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "categories"] {
    _id,
    title,
    "imageURL": image.asset->url,
    products,
  }`;
  const categories = await client.fetch(query);
  return categories;
}

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <main className="max-w-screen-2xl mx-auto lg:px-28 overflow-x-hidden">
        <h1 className="lg:text-3xl text-xl sm:text-2xl font-bold text-center lg:text-left text-customBlue pt-20 lg:pt-48">
          Top Categories
        </h1>
        {/* main div which will do flex to it's child */}
        <div className="flex flex-col lg:flex-row gap-7 px-10 sm:px-16 md:px-28 lg:px-0 pt-5 lg:pt-0 lg:mt-10 ">
          {categories.map((category) => (
            <div key={category._id} className="relative group ">
              <Image
                className="w-[100%] h-[100%]"
                src={category.imageURL} 
                alt={category.title} 
                width={600}
                height={600}
              />
              {/* Black section that appears on hover */}
              <div className="absolute bottom-0 w-full gap-x-3 bg-black pl-5 bg-opacity-70 py-3 h-16 items-center text-left transition-all duration-300 opacity-0 group-hover:opacity-100">
                <h1 className="text-white text-lg">{category.title}</h1>
                <h1 className="text-gray-400 text-sm font-light">
                  {category.products} Products
                </h1>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Categories;
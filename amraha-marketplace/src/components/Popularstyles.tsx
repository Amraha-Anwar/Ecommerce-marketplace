"use client";

import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  imageURL: string;
  tags: string[];
  slug: string;
}

async function getPopular(): Promise<Product[]> {
  const query = `*[_type == "products" && "gallery" in tags] {
    _id,
    title,
    price,
    priceWithoutDiscount,
    price_id,
    badge,
     inventory,
    "imageURL": image.asset->url,
    tags,
    "slug": slug.current
  }`;
  const products= await client.fetch(query);
  return products;
}

function Popular() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPopular();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <main className="max-w-screen-2xl mx-auto lg:px-28 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row my-20 lg:my-48 gap-5">
        {/* Left Section */}
        <div className="w-full lg:w-[50%]">
          <div className="flex">
            <h1 className="lg:text-3xl sm:text-xl mx-5 lg:mx-0 mb-3 lg:-mb-[26rem] lg:-ml-20 lg:-rotate-90">
              EXPLORE NEW AND POPULAR STYLES
            </h1>
          </div>
          <div className="lg:h-[30rem] xl:h-[34rem] lg:ml-4 lg:-mt-16 sm:px-5 px-2">
            {products.length > 0 && (
              <Link href={`/product/${products[0].slug}`}>
                <Image
                  className="w-full h-full cursor-pointer"
                  src={products[0].imageURL}
                  alt={products[0].tags.join(", ")}
                  width={600}
                  height={600}
                />
              </Link>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[50%] px-10 lg:px-0">
          <div className="grid grid-cols-2 gap-5 mb-1 justify-center sm:justify-between sm:px-10 md:gap-12 lg:px-0 lg:-mt-16">
            {products
              .slice(1, 3) // Get products 2 and 3
              .map((product) => (
                <Link key={product._id} href={`/product/${product.slug}`}>
                  <div>
                    <Image
                      className="w-full h-full cursor-pointer"
                      src={product.imageURL}
                      alt={product.tags.join(", ")}
                      width={600}
                      height={500}
                    />
                  </div>
                </Link>
              ))}
          </div>
          <div className="grid grid-cols-2 gap-5 justify-center sm:pt-6 md:gap-12 lg:mt-10 xl:mt-0 lg:px-0">
            {products
              .slice(3, 5) // Get products 4 and 5
              .map((product) => (
                <Link key={product._id} href={`/product/${product.slug}`}>
                  <div>
                    <Image
                      className="w-full h-full rounded-md cursor-pointer"
                      src={product.imageURL}
                      alt={product.tags.join(", ")}
                      width={600}
                      height={500}
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Popular;
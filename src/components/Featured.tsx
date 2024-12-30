import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { BaggageClaim } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
  imageURL: string;
}

async function getFeaturedProducts() {
  const query = `*[_type == "product"][0...4] | order(_createdAt asc) {
  _id,name,price,
    "slug": slug.current,
    "imageURL": image.asset->url
}`;
  const products = await client.fetch(query);
  return products;
}
async function FeaturedProducts() {
  const products: Product[] = await getFeaturedProducts();
  return (
    <>
      <main className="max-w-screen-2xl mx-auto overflow-x-hidden lg:px-28">
        <h1 className="lg:text-3xl text-xl sm:text-2xl text-center lg:text-left font-bold text-customBlue pb-4 sm:pb-6 lg:pb-10">
          Featured Products
        </h1>
        {/* main div which will flex all */}
       <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 px-4 overflow-hidden">
        {products.map((product) => (
         <div key={product._id} className="group relative">
           <div className="aspect-square w-full overflow-hidden rounded-md  group-hover:scale-105 transition-transform duration-300 lg:h-80">
            <Image
              src={product.imageURL}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover object-center"/>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <Link href={`/product/${product.slug}`}>
            <h1 className=" text-customTeal pt-2">{product.name}</h1></Link>
            <p className="text-lg font-medium">${product.price}</p>
            </div>
            <div>
            <button className="bg-customGray px-4 py-3 rounded-[5px] text-black hover:bg-customTeal hover:text-white"><BaggageClaim/></button></div>
          </div>
          </div>
        ))}
       </div>
      </main>
    </>
  );
}
export default FeaturedProducts;

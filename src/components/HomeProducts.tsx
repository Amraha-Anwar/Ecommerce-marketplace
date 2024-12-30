import {client} from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { BaggageClaim } from "lucide-react";

interface Items {
  _id: string;
  name: string;
  price: number;
  slug: string;
  imageURL: string;
}


async function getOurProducts(){
  const query=`*[_type == "product"]{
  _id,name,price,
    "slug": slug.current,
    "imageURL": image.asset->url
}`;
const items=await client.fetch(query);
return items;
}
export default async function OurProducts() {
  const items:Items[] =await getOurProducts();
  return (
    <>
      <main className="max-w-screen-2xl mx-auto overflow-x-hidden lg:px-28">
        <h1 className="text-customBlue text-center xl:text-left lg:text-3xl font-bold text-xl sm:text-2xl pb-3 lg:pb-10">
          Our Products
        </h1>
        {/* main div for upper products */}
        <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 lg:gap-y-16 px-4 md:px-10 lg:px-0  overflow-hidden">
      {items.map((item) => (
        <div key={item._id} className="group relative">
          <div className="w-full overflow-hidden rounded-md transition-transform duration-200 group-hover:scale-105">
            <Image
              src={item.imageURL}
              alt={item.name}
              width={600}
              height={600}
              className="w-full h-full object-cover object-center"
            />
          </div>
            <div className="mt-4 flex justify-between">
            <div>
              <Link href={`/product/${item.slug}`}>
            <h1 className=" text-customTeal pt-2">{item.name}</h1></Link>
            <p className="text-lg font-medium">${item.price}</p>
            </div>
            <div>
            <button className="bg-customGray px-4 py-3 rounded-[5px] text-black hover:bg-customTeal hover:text-white"><BaggageClaim/></button></div>
          </div>
        </div>
      ))}
    </div>
        </div>
      </main>
    </>
  );
}

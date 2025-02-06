
import TopNavbar from "@/components/TopNavbar";
import MiddleNavbar from "@/components/MiddleNavbar";
import BottomNavbar from "@/components/BottomNavbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import ProductDetails from "@/components/ProductDetails";
import DynamicFeatured from "@/components/DynamicFeatured"; 


interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  slug: {
    current: string;
  };
  price_id: string;
  inventory: number;
  badge?: string;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch product data from Sanity
  const product = await client.fetch<Product>(
    `*[_type == "products" && slug.current == $slug][0] {
      ...,
    }`,
    { slug: params.slug }
  );

  // If product not found, show an error message
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
    <TopNavbar />
    <MiddleNavbar />
    <BottomNavbar />
    <div>
      <ProductDetails initialProduct={product} />
      <DynamicFeatured /> 
    </div>
    <Footer />
    </>
  );
}

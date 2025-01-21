import { client } from "@/sanity/lib/client";
import ProductDetails from "@/components/ProductDetails";

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

  // Pass the product data to the ProductDetails component
  return <ProductDetails initialProduct={product} />;
}
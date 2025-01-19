import { client } from "@/sanity/lib/client";
import ProductDetails from "@/components/ProductDetails";

async function getData(slug: string) {
  const query = `*[_type == "products" && slug.current == "${slug}"][0]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    description,
    "image": image.asset->, 
    "slug": slug.current,
    price_id,
    inventory,
    badge
  }`;
  const data = await client.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);

  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto overflow-x-hidden px-5 sm:px-10 md:px-10 lg:px-28 py-20">
      <ProductDetails product={data} />
    </div>
  );
}
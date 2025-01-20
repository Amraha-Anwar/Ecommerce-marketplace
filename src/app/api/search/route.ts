import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("q");

  if (!searchTerm) {
    return NextResponse.json(
      { message: "Search term is required" },
      { status: 400 }
    );
  }

  try {
    const query = `
      *[_type == "products" && (
        title match $searchTerm || // Search by title
        count(tags[@ match $searchTerm]) > 0 // Search by tags
      )] {
        _id,
        title,
        description,
        price,
        priceWithoutDiscount,
        badge,
        "imageUrl": image.asset->url,
        "slug": slug.current,
        category->{ title },
        tags
      }
    `;

    const products = await client.fetch(query, {
      searchTerm: `*${searchTerm}*`, // Wildcard search for title and tags
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error },
      { status: 500 }
    );
  }
}
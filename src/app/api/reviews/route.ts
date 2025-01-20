import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { productId, name, rating, comment } = await request.json();

  try {
    // Append the new review to the product's reviews array
    const updatedProduct = await client
      .patch(productId) // Use the product ID to find the document
      .setIfMissing({ reviews: [] }) // Initialize reviews array if it doesn't exist
      .append("reviews", [
        {
          name,
          rating,
          comment,
          date: new Date().toISOString(),
        },
      ])
      .commit(); // Commit the changes

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit review." },
      { status: 500 }
    );
  }
}
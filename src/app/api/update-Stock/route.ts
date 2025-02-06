import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { updates } = await request.json();

    // Validate input
    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { message: "Invalid updates array" },
        { status: 400 }
      );
    }

    for (const update of updates) {
      const { productId, quantity } = update;

      if (!productId || typeof productId !== "string") {
        return NextResponse.json(
          { message: "Invalid product ID" },
          { status: 400 }
        );
      }

      if (typeof quantity !== "number" || quantity <= 0) {
        return NextResponse.json(
          { message: "Invalid quantity" },
          { status: 400 }
        );
      }

      const product = await client.fetch(
        `*[_type == "products" && _id == $productId][0]{
          _id,
          inventory,
        }`,
        { productId }
      );

      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }

      const newInventory = product.inventory - quantity;

      if (newInventory < 0) {
        return NextResponse.json(
          { message: "Insufficient stock" },
          { status: 400 }
        );
      }

      console.log(
        `Updating stock for product ${productId}: ${product.inventory} -> ${newInventory}`
      );

      await client
        .patch(productId)
        .dec({ inventory: quantity })
        .commit();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
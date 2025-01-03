"use client"

import { BsCart3 } from "react-icons/bs";
import { useShoppingCart } from "use-shopping-cart";

export interface CartProduct {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  price_id: string;
}

export default function AddToCart2({
  name,
  image,
  description,
  price,
  currency,
  price_id,
}: CartProduct) {
  const { addItem } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: image,
    price_id: price_id,
  };

  return (
    <button
      onClick={() => addItem(product)}
      className="flex items-center justify-center bg-customTeal rounded-md px-4 py-4 md:px-2 md:py-2 lg:px-4 lg:py-4 gap-2 text-white font-medium md:font-normal lg:font-medium"
    >
      <BsCart3 className="font-bold w-5 h-5" />
      Add To Cart
    </button>
  );
}

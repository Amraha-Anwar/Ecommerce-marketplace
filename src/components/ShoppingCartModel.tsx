"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import { MouseEvent } from "react"; // Import MouseEvent from React

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    incrementItem,
    decrementItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleCheckout(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.log("result");
      }
    } catch (error) {
      console.log("Checkout Error:", error);
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">{`You don't have any items yet`}</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="py-6 flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt="product image"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-customBlue">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <button
                              className="px-2 py-1 bg-gray-200 rounded-md"
                              onClick={() => decrementItem(entry.id)}
                            >
                              -
                            </button>
                            <p className="text-gray-500">{entry.quantity}</p>
                            <button
                              className="px-2 py-1 bg-gray-200 rounded-md"
                              onClick={() => incrementItem(entry.id)}
                            >
                              +
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="font-medium text-customDarkBlue hover:text-customDarkBlue/80"
                              onClick={() => removeItem(entry.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-customBlue">
              <p>Subtotal:</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and Taxes are calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="w-full bg-customTeal text-white py-2 font-medium rounded-md flex items-center justify-center"
              >
                Checkout
              </button>
            </div>
            <div className="mt-6 justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className="font-medium text-customTeal hover:text-customTeal/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}














// "use client";


// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useShoppingCart } from "use-shopping-cart";
// import Image from "next/image";
// import { MouseEvent } from "react"; // Import MouseEvent from React

// export default function ShoppingCartModal() {
//   const {
//     cartCount,
//     shouldDisplayCart,
//     handleCartClick,
//     cartDetails,
//     removeItem,
//     incrementItem,
//     decrementItem,
//     totalPrice,
//     redirectToCheckout,
//   } = useShoppingCart();

//   async function handleCheckout(event: MouseEvent<HTMLButtonElement>) {
//     event.preventDefault();
  
//     try {
//       // Step 1: Update stock in Sanity for each product in the cart
//       const updateStockPromises = Object.values(cartDetails ?? {}).map(async (entry) => {
//         const response = await fetch('/api/update-Stock', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             productId: entry.id,
//             quantity: entry.quantity,
//           }),
//         });
  
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Failed to update stock');
//         }
  
//         return response.json();
//       });
  
//       // Wait for all stock updates to complete
//       await Promise.all(updateStockPromises);
  
//       // Step 2: Redirect to Stripe Checkout
//       const result = await redirectToCheckout();
  
//       // If the redirect fails, throw an error
//       if (result?.error) {
//         throw new Error(result.error);
//       }
//     } catch (error) {
//       // Type guard to check if the error is an instance of Error
//       if (error instanceof Error) {
//         console.error("Checkout failed:", error);
//         alert(`Checkout failed: ${error.message}`);
//       } else {
//         // Handle cases where the error is not an Error object
//         console.error("Checkout failed with an unknown error:", error);
//         alert("Checkout failed due to an unknown error.");
//       }
//     }
//   }

//   return (
//     <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
//       <SheetContent className="sm:max-w-lg w-[90vw]">
//         <SheetHeader>
//           <SheetTitle>Shopping Cart</SheetTitle>
//         </SheetHeader>
//         <div className="h-full flex flex-col justify-between">
//           <div className="mt-8 flex-1 overflow-y-auto">
//             <ul className="-my-6 divide-y divide-gray-200">
//               {cartCount === 0 ? (
//                 <h1 className="py-6">{`You don't have any items yet`}</h1>
//               ) : (
//                 <>
//                   {Object.values(cartDetails ?? {}).map((entry) => (
//                     <li key={entry.id} className="py-6 flex">
//                       <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                         <Image
//                           src={entry.image as string}
//                           alt="product image"
//                           width={100}
//                           height={100}
//                         />
//                       </div>
//                       <div className="ml-4 flex flex-1 flex-col">
//                         <div>
//                           <div className="flex justify-between text-base font-medium text-customBlue">
//                             <h3>{entry.name}</h3>
//                             <p className="ml-4">${entry.price}</p>
//                           </div>
//                           <p className="mt-1 text-sm text-gray-500 line-clamp-2">
//                             {entry.description}
//                           </p>
//                         </div>
//                         <div className="flex flex-1 items-end justify-between text-sm">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               className="px-2 py-1 bg-gray-200 rounded-md"
//                               onClick={() => decrementItem(entry.id)}
//                             >
//                               -
//                             </button>
//                             <p className="text-gray-500">{entry.quantity}</p>
//                             <button
//                               className="px-2 py-1 bg-gray-200 rounded-md"
//                               onClick={() => incrementItem(entry.id)}
//                             >
//                               +
//                             </button>
//                           </div>
//                           <div>
//                             <button
//                               type="button"
//                               className="font-medium text-customDarkBlue hover:text-customDarkBlue/80"
//                               onClick={() => removeItem(entry.id)}
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </>
//               )}
//             </ul>
//           </div>
//           <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
//             <div className="flex justify-between text-base font-medium text-customBlue">
//               <p>Subtotal:</p>
//               <p>${totalPrice}</p>
//             </div>
//             <p className="mt-0.5 text-sm text-gray-500">
//               Shipping and Taxes are calculated at checkout.
//             </p>
//             <div className="mt-6">
//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-customTeal text-white py-2 font-medium rounded-md flex items-center justify-center"
//               >
//                 Checkout
//               </button>
//             </div>
//             <div className="mt-6 justify-center text-center text-sm text-gray-500">
//               <p>
//                 OR{" "}
//                 <button
//                   onClick={() => handleCartClick()}
//                   className="font-medium text-customTeal hover:text-customTeal/80"
//                 >
//                   Continue Shopping
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
"use client";

import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";

export default function CheckoutFormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(false);
  const { cartDetails, totalPrice, redirectToCheckout } = useShoppingCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare cart items for Sanity (order schema)
      const cartItems = Object.values(cartDetails ?? {}).map((item) => ({
        _key: item.id, 
        _type: "reference",
        _ref: item.productId,   
      }));

      // Order details to save in the order schema
      const orderData = {
        _type: "order",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        cartItems: cartItems.map((item) => ({
            _type: "object",
            products: {
              _type: "reference",
              _ref: item._ref,
            },
          })),
        total: totalPrice ?? 0, 
        orderDate: new Date().toISOString(),
      };

      console.log("Order Data to be saved:", orderData); // Debugging

      // Save order to Sanity
      const orderResult = await client.create(orderData).catch((error) => {
        console.error("Error creating order in Sanity:", error);
        console.error("Order Data:", orderData); // Debugging
        throw new Error("Failed to save order to Sanity");
      });

      console.log("Order saved to Sanity:", orderResult);

      // Send order confirmation email (optional)
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          cartItems: Object.values(cartDetails ?? {}).map((item) => ({
            name: item.name,
            price: item.price, // Remove division by 100
            quantity: item.quantity,
          })),
          totalPrice: totalPrice ?? 0, // Remove division by 100
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      console.log("Email sent successfully");

      // Store data in sessionStorage (optional)
      sessionStorage.setItem(
        "checkoutData",
        JSON.stringify({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          cartItems: Object.values(cartDetails ?? {}).map((item) => ({
            name: item.name,
            price: item.price, // Remove division by 100
            quantity: item.quantity,
          })),
          totalPrice: totalPrice ?? 0, // Remove division by 100
        })
      );

      // Redirect to Stripe Checkout
      const checkoutResult = await redirectToCheckout().catch((error) => {
        console.error("Error during Stripe checkout redirect:", error);
        throw new Error("Failed to redirect to Stripe checkout");
      });

      if (checkoutResult?.error) {
        console.error("Checkout error:", checkoutResult.error);
        alert("Checkout failed. Please try again.");
        return; // Stop execution
      } else {
        console.log("Checkout successful!");
      }
    } catch (error) {
      console.error("Error during checkout process:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Checkout Form</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-customTeal text-white py-2 px-4 rounded-lg hover:bg-customTeal/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Saving..." : "Proceed to Payment"}
          </button>
        </form>

        {/* Cart Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {Object.values(cartDetails ?? {}).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={item.image as string}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-base font-medium">
                {" "}
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between mt-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">
              ${(totalPrice ?? 0).toFixed(2)}
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
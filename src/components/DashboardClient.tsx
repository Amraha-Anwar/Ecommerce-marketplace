"use client";

import { useEffect, useState } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

// Define the Order type based on your schema
interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  total: number;
  status: string;
  orderDate: string;
  cartItems: {
    products: {
      _ref: string;
    };
  }[];
}

export default function DashboardClient() {
  const { user, isSignedIn } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders from Sanity (only for the logged-in customer)
  const fetchOrders = async () => {
    if (!user?.emailAddresses[0].emailAddress) return;

    try {
      const data = await client.fetch(
        `*[_type == "order" && email == $email]{
          _id,
          firstName,
          lastName,
          email,
          total,
          status,
          orderDate,
          cartItems[]{
            products->{
              _id,
              name,
              price
            }
          }
        }`,
        { email: user.emailAddresses[0].emailAddress }
      );
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSignedIn) return; // Only fetch orders if the user is signed in

    fetchOrders(); // Initial fetch

    // Polling every 10 seconds
    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isSignedIn, user]); // Add `isSignedIn` and `user` as dependencies

  // Redirect if not signed in
  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <h2 className="text-xl font-semibold text-gray-700">
          You must be signed in to access the dashboard.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          My Account
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="text-customTeal hover:text-customDarkBlue transition-colors duration-200"
          >
            Continue Shopping
          </Link>
          <SignOutButton>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-customTeal to-customDarkBlue text-white font-semibold hover:scale-105 hover:shadow-md transition-all duration-200 active:scale-95">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </nav>

      {/* User Info */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome back, {user?.firstName} 👋
        </h2>
        <p className="text-gray-600">Manage your account and track your orders.</p>
      </div>

      {/* Recent Orders */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        {loading ? (
          <p className="text-gray-600">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full mt-2 border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left text-gray-800">Order ID</th>
                  <th className="p-2 text-left text-gray-800">Customer</th>
                  <th className="p-2 text-left text-gray-800">Date</th>
                  <th className="p-2 text-left text-gray-800">Total</th>
                  <th className="p-2 text-left text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-2 text-gray-700">{order._id}</td>
                    <td className="p-2 text-gray-700">{order.firstName}</td>
                    <td className="p-2 text-gray-700">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 text-gray-700">${order.total}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          order.status === "delivered"
                            ? "bg-green-500"
                            : order.status === "processing"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
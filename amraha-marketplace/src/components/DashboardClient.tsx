"use client";

import { useEffect, useState } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

// Define the Order type
interface Order {
  _id: string;
  userInfo: {
    name: string;
  };
  totalAmount: number;
  status: string;
}

export default function DashboardClient() {
  const { user, isSignedIn } = useUser();
  const [orders, setOrders] = useState<Order[]>([]); 
  const [loading, setLoading] = useState(true);

  // Fetch Orders from Sanity
  useEffect(() => {
    if (!isSignedIn) return; // Only fetch orders if the user is signed in

    const fetchOrders = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "orders"]{
            _id,
            userInfo->{
              name
            },
            totalAmount,
            status
          }
        `);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isSignedIn]); // Add `isSignedIn` as a dependency

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
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-customTeal hover:text-customDarkBlue transition-colors duration-200"
          >
            Continue Shopping
          </Link>
          <Link
            href="/shopPage"
            className="text-customTeal hover:text-customDarkBlue transition-colors duration-200"
          >
            Shop
          </Link>
          <Link
            href="/products"
            className="text-customTeal hover:text-customDarkBlue transition-colors duration-200"
          >
            Products
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
          Welcome, {user?.firstName} 👋
        </h2>
        <p className="text-gray-600">Manage your store and track your sales.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <DashboardCard title="Total Revenue" value="$12,500" />
        <DashboardCard title="Total Orders" value={orders.length.toString()} />
        <DashboardCard title="Total Products" value="50" />
      </div>

      {/* Recent Orders */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        {loading ? (
          <p className="text-gray-600">Loading orders...</p>
        ) : (
          <table className="w-full mt-2 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left text-gray-800">Order ID</th>
                <th className="p-2 text-left text-gray-800">Customer</th>
                <th className="p-2 text-left text-gray-800">Amount</th>
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
                  <td className="p-2 text-gray-700">
                    {order.userInfo?.name || "Unknown"}
                  </td>
                  <td className="p-2 text-gray-700">${order.totalAmount}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === "Shipped"
                          ? "bg-green-500"
                          : order.status === "Processing"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Reusable Dashboard Card Component
function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-2xl font-bold text-customTeal">{value}</p>
    </div>
  );
}
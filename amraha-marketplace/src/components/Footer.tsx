"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, MessageCircleHeart, Youtube } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("🎉 You've been subscribed successfully!", {
          style: {
            background: "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
          },
          icon: "✅",
        });
        setEmail("");
      } else {
        toast.error(data.message || "⚠️ Subscription failed. Please try again.", {
          style: {
            background: "#FF6347",
            color: "#fff",
            fontWeight: "bold",
          },
          icon: "⚠️",
        });
      }
    } catch (error) {
      toast.error("❌ An error occurred. Please try again.", {
        style: {
          background: "#D32F2F",
          color: "#fff",
          fontWeight: "bold",
        },
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="max-w-screen-2xl mx-auto border-t mt-32 bg-white">
      <div className="container mx-auto px-4 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Social Media */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2">
              <Image className="w-12 h-12" src="/images/logo.png" alt="logo" width={200} height={200} />
              <h1 className="font-bold text-2xl text-customBlue">Comforty</h1>
            </div>
            <p className="text-gray-500 text-center lg:text-left mt-4">
              Vivamus tristique odit sit amet velit semper,
              <br />
              eu posuere turpis interdum.
              <br />
              Cras egestas purus
            </p>
            <div className="flex gap-6 mt-6">
              <Facebook className="text-gray-500 hover:text-customTeal cursor-pointer" strokeWidth={2} />
              <Twitter className="text-gray-500 hover:text-customTeal cursor-pointer" strokeWidth={2} />
              <Instagram className="text-gray-500 hover:text-customTeal cursor-pointer" strokeWidth={2} />
              <MessageCircleHeart className="text-gray-500 hover:text-customTeal cursor-pointer" strokeWidth={2} />
              <Youtube className="text-gray-500 hover:text-customTeal cursor-pointer" strokeWidth={2} />
            </div>
          </div>

          {/* Category Links */}
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-xl text-gray-400 mb-6">Category</h2>
            <div className="flex flex-col gap-3 font-semibold">
              {["Sofa", "Armchair", "Wing Chair", "Desk Chair", "Wood Chair", "Park Bench"].map((item) => (
                <Link href="#" key={item}>
                  <p className="text-gray-700 hover:text-customTeal hover:underline">{item}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-xl text-gray-400 mb-6">Support</h2>
            <div className="flex flex-col gap-3 font-semibold">
              {["Help & Support", "Terms & Conditions", "Privacy Policy", "Help"].map((item) => (
                <Link href="#" key={item}>
                  <p className="text-gray-700 hover:text-customTeal hover:underline">{item}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-xl text-gray-400 mb-6">Newsletter</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubscribe}>
              <input
                className="border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-customTeal text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-8 pt-6">
          <p className="text-gray-600 text-center">
            © 2021 Blogy - Designed & Developed by{" "}
            <span className="text-black font-semibold">Amraha Anwar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

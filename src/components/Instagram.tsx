import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import toast from "react-hot-toast";

interface InstagramProduct {
  _id: string;
  slug: string;
  imageURL: string;
  title: string;
}

async function getInstagramProducts() {
  const query = `*[_type == "products" && "instagram" in tags] | order(badge asc) {
    _id,
    title,
    "imageURL": image.asset->url,
    "slug": slug.current,
  }`;
  return await client.fetch(query);
}

export default function InstagramProducts() {
  const [insta, setInsta] = useState<InstagramProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    getInstagramProducts()
      .then((data) => {
        setInsta(data);
        setLoadingProducts(false);
      })
      .catch(() => setLoadingProducts(false));
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

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
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-screen-2xl mx-auto overflow-x-hidden bottom-0">
      <div className="bg-customGray w-full mt-32 relative">
        <h1 className="text-black text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center pt-14">
          Or Subscribe To The Newsletter
        </h1>
        <div className="flex justify-center lg:gap-x-3 mt-10">
          <form className="flex items-center gap-5 w-2/3 sm:w-1/2 lg:w-1/2" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Email Address..."
              className="border-b-2 bg-customGray border-black w-full h-10 text-black text-left placeholder:text-left focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="border-b-2 border-black h-10 px-4 text-black focus:outline-none"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "SUBMIT"}
            </button>
          </form>
        </div>
        <h1 className="text-black text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center pt-14">
          Follow Products And Discounts On Instagram
        </h1>

        {/* Instagram Products Section */}
        {loadingProducts ? (
          <p className="text-center text-black text-lg">Loading products...</p>
        ) : insta.length === 0 ? (
          <p className="text-center text-black text-lg">No Instagram products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4 lg:px-28 py-20">
            {insta.map((product) => (
              <div key={product._id} className="w-full">
                <Image
                  src={product.imageURL}
                  alt={product.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  width={300}
                  height={300}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

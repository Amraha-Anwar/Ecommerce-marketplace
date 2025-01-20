"use client";

import { useState, useEffect } from "react"; // Add useEffect
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import toast from "react-hot-toast";
import StarRating from "@/components/StarRating";

interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  slug: {
    current: string;
  };
  price_id: string;
  inventory: number;
  badge?: string;
  reviews?: Array<{
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
}

export default function ProductDetails({ product }: { product: Product }) {
  // Initialize wishlist state from localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });

  const [review, setReview] = useState<Review>({
    name: "",
    rating: 0,
    comment: "",
  });
  const [message, setMessage] = useState<string>("");
  const [reviews, setReviews] = useState(product.reviews || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Handle adding product to wishlist
  const handleAddToWishlist = () => {
    // Check if the product is already in the wishlist
    const isProductInWishlist = wishlist.some((item) => item._id === product._id);

    if (isProductInWishlist) {
      toast.error(`${product.title} is already in your wishlist!`);
      return;
    }

    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist, product];
      toast.success(`${product.title} has been added to your wishlist!`);
      console.log("Wishlist:", updatedWishlist);
      return updatedWishlist;
    });
  };

  // Handle adding product to cart
  const handleAddToCartMessage = () => {
    toast.success(`${product.title} has been added to the cart!`);
  };

  // Fetch updated product data from Sanity
  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/product?id=${product._id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  // Handle submitting a review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!review.name || !review.comment || review.rating === 0) {
      setMessage("Please fill out all fields and select a rating.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          name: review.name,
          rating: review.rating,
          comment: review.comment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Review submitted successfully!");
        setReview({
          name: "",
          rating: 0,
          comment: "",
        });
        // Re-fetch the product data to get the updated reviews
        const updatedProduct = await fetchProduct();
        if (updatedProduct) {
          setReviews(updatedProduct.reviews || []);
        }
      } else {
        setMessage(data.error || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes in the review form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  // Handle rating changes in the review form
  const handleRatingChange = (rating: number) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-20 md:gap-10 xl:gap-20">
      {/* Product Image */}
      <div className="md:w-[50%] relative">
        {product.image ? (
          <Image
            src={urlFor(product.image).url()}
            alt={product.title || "Product Image"}
            width={800}
            height={800}
          />
        ) : (
          <div className="bg-gray-200 w-full h-[400px] flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
        {product.badge && (
          <div
            className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-md ${
              product.badge === "New"
                ? "bg-green-600"
                : product.badge === "Sales"
                ? "bg-orange-500"
                : "bg-gray-600"
            }`}
          >
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="md:w-[50%]">
        <h1 className="text-customBlue text-3xl sm:text-5xl md:text-4xl xl:text-7xl font-bold -mt-10 md:-mt-0">
          {product.title}
        </h1>
        <div className="flex items-center gap-3 my-5">
          <p className="bg-customTeal text-white font-semibold lg:text-xl px-4 py-2 rounded-full">
            ${product.price}.00 USD
          </p>
          {product.priceWithoutDiscount && (
            <p className="text-gray-500 line-through text-sm">
              ${product.priceWithoutDiscount}.00 USD
            </p>
          )}
        </div>
        <hr />
        <h2 className="my-10 md:my-5 lg:my-10 text-gray-600 font-medium">
          {product.description}
        </h2>

        {/* Availability */}
        {product.inventory > 0 ? (
          <p className="text-gray-500 font-semibold mb-3 text-sm">
            Availability:
            <span className="text-green-500 font-semibold mb-3 text-sm">
              {" "}
              In Stock {product.inventory}{" "}
            </span>
          </p>
        ) : (
          <p className="text-gray-500 font-semibold text-sm">
            Availability:
            <span className="text-red-500 font-semibold text-sm">
              {" "}
              Out of Stock
            </span>
          </p>
        )}

        {/* Add to Cart or Wishlist */}
        {product.inventory > 0 ? (
          <AddToCart
            currency="USD"
            name={product.title}
            description={product.description}
            image={product.image}
            price={product.price}
            key={product._id}
            price_id={product.price_id}
            onAddToCart={handleAddToCartMessage}
          />
        ) : (
          <button
            onClick={handleAddToWishlist}
            className="bg-customTeal text-white py-2 px-5 rounded-full mt-5"
          >
            Add To Wishlist
          </button>
        )}

        {/* Display Wishlist */}
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-3">Your Wishlist</h2>
          {wishlist.length > 0 ? (
            <ul>
              {wishlist.map((item, index) => (
                <li key={index} className="text-gray-600">
                  {item.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Your wishlist is empty.</p>
          )}
        </div>

        {/* Review Form */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Leave a Review</h2>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <StarRating
                rating={review.rating}
                onRatingChange={handleRatingChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={review.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <textarea
                name="comment"
                value={review.comment}
                onChange={handleChange}
                placeholder="Your Review"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-customTeal text-white py-2 px-5 rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
        </div>

        {/* Customer Reviews */}
        {reviews.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5">Customer Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-yellow-500">{"★".repeat(review.rating)}</p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
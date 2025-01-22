"use client";

import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import toast from "react-hot-toast";
import { FaStar, FaRegStar } from "react-icons/fa";
import { client } from "@/sanity/lib/client";

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
  reviews?: Review[]; // Optional reviews array
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface SanityProduct {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  price: number;
  price_id: string;
  priceWithoutDiscount?: number;
  badge?: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description: string;
  inventory: number;
  reviews?: Review[];
}

// Fetch product data from Sanity
const fetchProduct = async (id: string) => {
  const query = `*[_type == "products" && (slug.current == $id || _id == $id)][0] {
    _id,
    _type,
    title,
    slug,
    price,
    price_id,
    priceWithoutDiscount,
    badge,
    image,
    description,
    inventory,
    reviews[] {
      name,
      rating,
      comment,
      date
    }
  }`;

  const sanityProduct = await client.fetch(query, { id });

  if (!sanityProduct) {
    throw new Error("Product not found");
  }

  return sanityProduct;
};

// Transform Sanity product data to match the Product interface
const transformToProduct = (sanityProduct: SanityProduct): Product | null => {
  if (!sanityProduct) return null;

  return {
    _id: sanityProduct._id,
    title: sanityProduct.title,
    slug: sanityProduct.slug,
    price: sanityProduct.price,
    price_id: sanityProduct.price_id,
    priceWithoutDiscount: sanityProduct.priceWithoutDiscount,
    badge: sanityProduct.badge,
    image: sanityProduct.image,
    description: sanityProduct.description,
    inventory: sanityProduct.inventory,
    reviews: Array.isArray(sanityProduct.reviews) ? sanityProduct.reviews : [],
  };
};

export default function ProductDetails({ initialProduct }: { initialProduct?: Product }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    date: new Date().toISOString(), // Automatically set the date
  });

  // Fetch product data if initialProduct is not provided
  useEffect(() => {
    const loadProduct = async () => {
      try {
        let productData;
        if (initialProduct) {
          productData = initialProduct;
        } else {
          // Fetch product data from Sanity
          const id = window.location.pathname.split("/").pop(); // Extract ID or slug from URL
          if (!id) throw new Error("Product ID or slug not found in URL");
          const sanityProduct = await fetchProduct(id);
          productData = transformToProduct(sanityProduct);
        }

        if (!productData) {
          throw new Error("Product not found");
        }

        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [initialProduct]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Handle adding product to wishlist
  const handleAddToWishlist = () => {
    if (!product) {
      toast.error("Product data is missing!");
      return;
    }

    const isProductInWishlist = wishlist.some((item) => item._id === product._id);

    if (isProductInWishlist) {
      toast.error(`${product.title} is already in your wishlist!`);
      return;
    }

    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist, product];
      toast.success(`${product.title} has been added to your wishlist!`);
      return updatedWishlist;
    });
  };

  // Handle adding product to cart
  const handleAddToCartMessage = () => {
    if (!product) {
      toast.error("Product data is missing!");
      return;
    }

    toast.success(`${product.title} has been added to the cart!`);
  };

  // Handle review input changes
  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  // Handle rating selection
  const handleRatingChange = (rating: number) => {
    setReview((prev) => ({ ...prev, rating }));
  };

  // Submit review to Sanity
  const handleSubmitReview = async () => {
    if (!product || !review.name || !review.comment || review.rating === 0) {
      toast.error("Please fill out all fields and provide a rating.");
      return;
    }

    try {
      // Save the review to Sanity
      const response = await client
        .patch(product._id) // Patch the product document
        .setIfMissing({ reviews: [] }) // Ensure the reviews array exists
        .append("reviews", [review]) // Append the new review
        .commit(); // Commit the changes

      if (!response) {
        throw new Error("Failed to submit review.");
      }

      // Re-fetch the product data from Sanity to get the latest reviews
      const updatedProduct = await fetchProduct(product._id);

      // Update the local product state with the latest data
      setProduct(transformToProduct(updatedProduct));

      toast.success("Review submitted successfully!");
      setReview({ name: "", rating: 0, comment: "", date: new Date().toISOString() });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    }
  };

  // Calculate average rating (removed since it's unused)
  const reviews = product?.reviews || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between gap-20 px-10 lg:px-28 lg:py-20 md:gap-10 xl:gap-20">
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

        {/* Review Form */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-[#252B42] mb-4">
            Leave a Review
          </h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={review.name}
              onChange={handleReviewChange}
              className="p-2 border border-[#E8E8E8] rounded-lg"
            />
            <textarea
              name="comment"
              placeholder="Your Review"
              value={review.comment}
              onChange={handleReviewChange}
              className="p-2 border border-[#E8E8E8] rounded-lg"
              rows={4}
            />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`text-2xl ${
                    star <= review.rating ? "text-[#F3CD03]" : "text-[#BDBDBD]"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              onClick={handleSubmitReview}
              className="px-6 py-2 bg-[#23A6F0] text-white rounded-lg hover:bg-[#1E90FF] transition-all"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Display Reviews */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-[#252B42] mb-4">
            Customer Reviews
          </h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#252B42]">{review.name}</span>
                  <div className="flex text-[#F3CD03]">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <FaStar key={i} size={16} />
                      ) : (
                        <FaRegStar key={i} size={16} />
                      )
                    )}
                  </div>
                  <span className="text-[#737373] text-sm">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[#858585] mt-2">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-[#737373]">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
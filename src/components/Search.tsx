"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Search icon
import { ImSpinner8 } from "react-icons/im"; // Loading spinner

// Define the product type
interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  slug: string;
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Use the Product type
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false); // State to track no results
  const router = useRouter();

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Ignore empty search terms

    setIsSearching(true);
    setNoResults(false); // Reset no results state
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (data.length === 0) {
        setNoResults(true); // No matching products found
      } else {
        setNoResults(false); // Reset no results state
      }

      setSearchResults(data);
    } catch (error) {
      console.error("Error searching products:", error);
      setNoResults(true); // Show error message if search fails
    } finally {
      setIsSearching(false);
    }
  };

  // Handle "Enter" key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Redirect to product detail page when a product is selected
  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`);
    setSearchTerm(""); // Clear the search term
    setSearchResults([]); // Clear the search results
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        {/* Compact Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Trigger search on "Enter"
          placeholder="Search..."
          className="w-32 sm:w-48 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customDarkBlue text-sm"
        />
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-customDarkBlue text-white rounded-lg flex items-center justify-center"
        >
          {isSearching ? (
            <ImSpinner8 className="animate-spin w-4 h-4" /> // Loading spinner (smaller size)
          ) : (
            <FaSearch className="w-4 h-4" /> // Search icon (smaller size)
          )}
        </button>
      </div>

      {/* Display search results or no results message */}
      {searchResults.length > 0 ? (
        <div className="absolute top-10 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {searchResults.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product.slug)} // Redirect to product detail page
              className="p-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-8 h-8 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-sm">{product.title}</h3>
                  <p className="text-xs text-gray-600">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : noResults ? (
        <div className="absolute top-10 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
          <p className="text-gray-600 text-sm">{`This product doesn't exist.`}</p>
        </div>
      ) : null}
    </div>
  );
}
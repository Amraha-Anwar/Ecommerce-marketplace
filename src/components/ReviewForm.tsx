"use client";

import { useState } from "react";
import StarRating from "@/components/StarRating";

export default function ReviewForm({
  productId,
  onSubmitSuccess,
}: {
  productId: string;
  onSubmitSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submit-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, ...formData }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", rating: 0, comment: "" }); // Reset form
        onSubmitSuccess(); // Trigger the success callback
      } else {
        setError(result.error || "Failed to submit review");
      }
    } catch (error) {
      setError("An error occurred while submitting the review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <StarRating
          rating={formData.rating}
          onRatingChange={(rating) => setFormData({ ...formData, rating })}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <textarea
          placeholder="Your Review"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          required
          className="w-full px-3 py-2 border  border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-customTeal text-white py-2 px-5 rounded-full"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
      {success && <p className="text-green-500">Review submitted successfully!</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
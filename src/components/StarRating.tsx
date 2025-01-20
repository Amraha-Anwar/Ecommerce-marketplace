"use client";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => onRatingChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
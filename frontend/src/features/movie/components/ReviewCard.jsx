import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const ReviewCard = ({ review, isOwner = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative rounded-xl bg-neutral-50 px-5 py-4 font-inter">
      <div className="flex items-start justify-between gap-2">
        <span className="font-poppins text-sm font-semibold text-primary">
          {review.name}
        </span>

        {isOwner && (
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-md p-1.5 text-neutral-400 transition-colors duration-200 hover:bg-neutral-200 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label="Review options"
            >
              <FaEllipsisV className="text-xs" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 z-10 w-32 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-md">
                <button className="w-full px-4 py-2 text-left font-inter text-sm text-primary transition-colors duration-150 hover:bg-neutral-50">
                  Edit
                </button>
                <button className="w-full px-4 py-2 text-left font-inter text-sm text-red-600 transition-colors duration-150 hover:bg-red-50">
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-primary/80">
        {review.review}
      </p>

      <p className="mt-4 text-right font-inter text-xs text-neutral-400">
        x days ago
      </p>
    </div>
  );
};

export default ReviewCard;

import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Button from "../../../components/ui/Button";

const ReviewCard = ({ reviewInfo, isOwner = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  return (
    <div className="relative rounded-xl bg-neutral-50 px-5 py-4 font-inter">
      <div className="flex items-start justify-between gap-2">
        <span className="font-poppins text-sm font-semibold text-primary">
          {review.name}
        </span>

        {isOwner && (
          <div className="relative shrink-0">
            <Button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-primary"
              aria-label="Review options"
            >
              <FaEllipsisV className="text-xs" />
            </Button>

            {menuOpen && (
              <div
                className="fixed inset-0 z-5"
                onClick={() => setMenuOpen(false)}
              />
            )}

            <div
              className={twMerge(
                "absolute right-0 top-8 z-10 w-32 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-md origin-top-right transition-all duration-200 ease-out",
                menuOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none",
              )}
            >
              <Button
                type="button"
                className="w-full rounded-none px-4 py-2 text-left font-inter text-sm font-normal text-primary hover:bg-neutral-50 active:scale-100 focus:ring-0 focus:ring-offset-0"
              >
                Edit
              </Button>
              <Button
                type="button"
                className="w-full rounded-none px-4 py-2 text-left font-inter text-sm font-normal text-red-600 hover:bg-red-50 active:scale-100 focus:ring-0 focus:ring-offset-0"
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-primary/80">
        {reviewInfo.review}
      </p>

      <p className="mt-4 text-right font-inter text-xs text-neutral-400">
        x days ago
      </p>
    </div>
  );
};

export default ReviewCard;

import SectionState from "../../../components/ui/SectionState";
import Reel from "../../../assets/images/reel.svg?react";
import emptySign from "../../../assets/images/reel.png";
import errorSign from "../../../assets/images/errorSign.png";

const states = {
  error: {
    imageSource: errorSign,
    message: "Couldn't load reviews.",
    description: "Please check your connection and try again.",
    buttonText: "Retry",
  },
  empty: {
    imageSource: emptySign,
    message: "No reviews yet.",
    description: "Reviews you write will appear here.",
  },
  "filtered-empty": {
    imageSource: emptySign,
    message: "No matching reviews.",
    description: "Try different dates or clear your filters.",
  },
  "load-more-error": {
    message: "Couldn't load more reviews.",
    description: "Your loaded reviews are still here. Try again to see more.",
    buttonText: "Retry",
  },
};

const ReviewListFeedback = ({ state, onRetry }) => {
  if (state === "loading-more") {
    return (
      <div role="status" className="flex items-center justify-center gap-3 py-8 font-inter text-sm text-secondary">
        <Reel className="size-6 motion-safe:animate-spin text-accent" aria-hidden="true" />
        Loading more reviews...
      </div>
    );
  }

  const content = states[state];
  if (!content) return null;

  return (
    <div className="py-10 md:py-14">
      <SectionState {...content} onRetry={onRetry} />
    </div>
  );
};

export default ReviewListFeedback;

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const HorizontalScroller = ({ children, ariaLabel }) => {
  const scrollerRef = useRef(null);

  const scroll = (left) => {
    scrollerRef.current?.scrollBy({ left, behavior: "smooth" });
  };

  return (
    <div className="flex min-w-0">
      <button
        type="button"
        className="hidden self-center rounded-full px-3 text-primary shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex"
        aria-label={`Scroll ${ariaLabel} left`}
        onClick={() => scroll(-300)}
      >
        <FaChevronLeft className="h-10" aria-hidden="true" />
      </button>
      <div
        ref={scrollerRef}
        className="min-w-0 flex-1 overflow-x-auto py-3 md:px-3"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>
      <button
        type="button"
        className="ml-2 hidden self-center rounded-full px-3 text-primary shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex"
        aria-label={`Scroll ${ariaLabel} right`}
        onClick={() => scroll(300)}
      >
        <FaChevronRight className="h-10" aria-hidden="true" />
      </button>
    </div>
  );
};

export default HorizontalScroller;

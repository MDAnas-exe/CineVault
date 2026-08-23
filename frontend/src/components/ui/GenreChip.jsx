import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

const GenreChip = ({ children }) => {
  const [isSelected, setIsSelected] = useState(false);

  // Future three-genre limit classes: cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400.
  return (
    <Button
      type="button"
      aria-pressed={isSelected}
      onClick={() => setIsSelected((selected) => !selected)}
      className={twMerge(
        "flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 py-2 font-inter text-sm font-medium active:scale-100",
        isSelected
          ? "border-accent bg-accent text-white shadow-sm hover:bg-[#bd8f16]"
          : "border-gray-200 bg-white text-primary hover:border-accent/60 hover:bg-amber-50",
      )}
    >
      <span>{children}</span>
      {isSelected && (
        <span className="flex size-5 items-center justify-center rounded-full bg-white text-[10px] text-accent">
          <FaCheck aria-hidden="true" />
        </span>
      )}
    </Button>
  );
};

export default GenreChip;

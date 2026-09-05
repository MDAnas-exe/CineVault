import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import Button from "../../../components/ui/Button";

const GenreChip = ({ children, className = "", isSelected, ...rest }) => {
  // Future three-genre limit classes: cursor-not-allowed border-border bg-primary/5 text-secondary.
  return (
    <Button
      type="button"
      aria-pressed={isSelected}
      {...rest}
      className={twMerge(
        "flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 py-2 font-inter text-sm font-medium active:scale-100",
        isSelected
          ? "border-accent bg-accent text-white shadow-sm hover:bg-accent-hover"
          : "border-border bg-surface text-primary hover:border-accent/60 hover:bg-accent/10",
        className,
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

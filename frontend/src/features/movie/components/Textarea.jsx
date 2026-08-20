import { twMerge } from "tailwind-merge";

const MAX_CHARS = 2000;

const Textarea = ({ isEditing, value, register, watch, className = "" }) => {
  if (!isEditing) {
    return (
      <p className="mt-3 text-xs leading-relaxed text-primary/80 md:text-sm">
        {value}
      </p>
    );
  }

  const { ref: rhfRef, ...rest } = register;

  return (
    <div className="relative">
      <textarea
        className={twMerge(
          "w-full min-h-28 md:min-h-36 resize-none rounded-xl border border-gray-200 bg-white px-3 pb-7 pt-2.5 md:px-4 md:pb-8 md:pt-3 font-inter text-xs md:text-sm text-primary placeholder:text-neutral-400 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
          className,
        )}
        placeholder="Share your thoughts about this movie..."
        {...rest}
        ref={(el) => {
          rhfRef(el);
        }}
      />
      <span className="absolute bottom-3 right-3 md:right-4 font-inter text-xs text-neutral-400">
        {watch(rest.name)?.length || 0} / {MAX_CHARS}
      </span>
    </div>
  );
};

export default Textarea;

import { twMerge } from "tailwind-merge";

const MAX_CHARS = 2000;

const Textarea = ({ isEditing, value, register, watch, className = "" }) => {
  if (!isEditing) {
    return (
      <p className="mt-3 text-sm leading-relaxed text-primary/80">{value}</p>
    );
  }

  const { ref: rhfRef, ...rest } = register;

  return (
    <div className="relative">
      <textarea
        className={twMerge(
          "w-full resize-none rounded-xl border border-gray-200 bg-white px-4 pb-8 pt-3 font-inter text-sm text-primary placeholder:text-neutral-400 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
          className,
        )}
        placeholder="Share your thoughts about this movie..."
        rows={5}
        {...rest}
        ref={(el) => {
          rhfRef(el);
        }}
      />
      <span className="absolute bottom-3 right-4 font-inter text-xs text-neutral-400">
        {watch(rest.name)?.length || 0} / {MAX_CHARS}
      </span>
    </div>
  );
};

export default Textarea;

const MAX_CHARS = 1000;

const ReviewForm = () => {
  return (
    <form>
      <div className="relative">
        <textarea
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 pb-8 pt-3 font-inter text-sm text-primary placeholder:text-neutral-400 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Share your thoughts about this movie..."
          maxLength={MAX_CHARS}
          rows={5}
        />
        <span className="absolute bottom-3 right-4 font-inter text-xs text-neutral-400">
          0 / {MAX_CHARS}
        </span>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          className="rounded-lg px-4 py-2 font-inter text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled
          className="rounded-lg bg-accent px-4 py-2 font-poppins text-sm font-semibold text-primary transition-colors duration-200 hover:bg-[#c89412] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;

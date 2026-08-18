import { useNavigate } from "react-router-dom";

const GuestReviewCTA = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate(`/login`);
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 px-5 py-4 font-inter">
      <div>
        <p className="font-poppins text-sm font-semibold text-primary md:text-base">
          Want to share your thoughts?
        </p>
        <p className="mt-0.5 text-xs text-neutral-500 md:text-sm">
          Sign in to write a review of this movie.
        </p>
      </div>

      <button
        onClick={handleSignIn}
        className="shrink-0 cursor-pointer rounded-lg bg-accent px-4 py-2 font-poppins text-xs font-semibold text-primary transition-colors duration-200 hover:bg-[#c89412] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 md:text-sm"
      >
        Sign in to review
      </button>
    </div>
  );
};

export default GuestReviewCTA;

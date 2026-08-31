import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";

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

      <Button
        type="button"
        onClick={handleSignIn}
        className="shrink-0 rounded-lg bg-accent px-4 py-2 text-xs text-primary hover:bg-accent-hover md:text-sm"
      >
        Sign in to review
      </Button>
    </div>
  );
};

export default GuestReviewCTA;

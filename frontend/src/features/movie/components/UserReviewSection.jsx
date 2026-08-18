import useAuth from "../../../hooks/useAuth";
import GuestReviewCTA from "./GuestReviewCTA";
import ReviewCardSkeleton from "../components/ReviewCardSkeleton";
const UserReviewSection = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <GuestReviewCTA />;
  }

  if (true) return <ReviewCardSkeleton />;
  // TODO: fetch user review, handle loading / error / form / existing review
  return null;
};

export default UserReviewSection;

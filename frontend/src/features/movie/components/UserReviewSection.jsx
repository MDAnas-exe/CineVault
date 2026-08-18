import useAuth from "../../../hooks/useAuth";
import GuestReviewCTA from "./GuestReviewCTA";

const UserReviewSection = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <GuestReviewCTA />;
  }

  // TODO: fetch user review, handle loading / error / form / existing review
  return null;
};

export default UserReviewSection;

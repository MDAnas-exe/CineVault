import useAuth from "../../../hooks/useAuth";
import GuestReviewCTA from "./GuestReviewCTA";
import SectionSubheading from "../../../components/ui/SectionSubheading";

const UserReviewSection = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <GuestReviewCTA />;
  }

  return (
    <div>
      <SectionSubheading>Your Review</SectionSubheading>
      {/* TODO: loading / error / ReviewForm / YourReview */}
    </div>
  );
};

export default UserReviewSection;

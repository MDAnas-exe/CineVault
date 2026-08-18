import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import apiRequest from "../../../utils/apiRequest";
import GuestReviewCTA from "./GuestReviewCTA";
import SectionSubheading from "../../../components/ui/SectionSubheading";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import SectionState from "../../../components/ui/SectionState";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

const UserReviewSection = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["user-review", id],
    queryFn: () =>
      apiRequest({ method: "GET", endpoint: `users/reviews/${id}` }),
    enabled: isLoggedIn && !!id,
    retry: false,
  });

  if (!isLoggedIn) return <GuestReviewCTA />;

  return (
    <div>
      <SectionSubheading>Your Review</SectionSubheading>

      {isLoading && <ReviewCardSkeleton />}

      {isError && error.status !== 404 && (
        <SectionState
          message="Failed to load your review"
          description="Something went wrong. Please try again."
          buttonText="Try Again"
          onRetry={refetch}
        />
      )}

      {isError && error.status === 404 && <ReviewForm />}

      {data && <ReviewCard review={data.review} isOwner />}
    </div>
  );
};

export default UserReviewSection;

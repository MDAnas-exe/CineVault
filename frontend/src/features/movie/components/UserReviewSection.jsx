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
import useMovieDetails from "../hooks/useMovieDetails";

const UserReviewSection = () => {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const { id } = useParams();
  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
    refetch: refetchMovie,
  } = useMovieDetails(id);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["user-review", id],
    queryFn: () =>
      apiRequest({ method: "GET", endpoint: `users/reviews/${id}` }),
    enabled: isLoggedIn && !!id,
    retry: false,
  });

  if (isAuthLoading) return <ReviewCardSkeleton />;
  if (!isLoggedIn) return <GuestReviewCTA />;

  const header = <SectionSubheading>Your Review</SectionSubheading>;

  if (isLoading || isFetching || isMovieLoading) {
    return (
      <div>
        {header}
        <ReviewCardSkeleton />
      </div>
    );
  }

  if (isMovieError) {
    return (
      <div>
        {header}
        <SectionState
          message="Couldn't load movie information."
          description="Retry to write or edit your review."
          buttonText="Retry"
          onRetry={refetchMovie}
        />
      </div>
    );
  }

  if (isError && error.status !== 404) {
    return (
      <div>
        {header}
        <SectionState
          message="Failed to load your review"
          description="Something went wrong. Please try again."
          buttonText="Try Again"
          onRetry={refetch}
        />
      </div>
    );
  }

  const movieInfo = movie && {
    title: movie.title,
    posterPath: movie.poster_path || null,
    releaseDate: movie.release_date || null,
  };

  if (isError && error.status === 404 && movieInfo) {
    return (
      <div>
        {header}
        <ReviewForm movieInfo={movieInfo} />
      </div>
    );
  }

  return (
    <div>
      {header}
      {data?.review && movieInfo && (
        <ReviewCard reviewInfo={data.review} movieInfo={movieInfo} isOwner />
      )}
    </div>
  );
};

export default UserReviewSection;

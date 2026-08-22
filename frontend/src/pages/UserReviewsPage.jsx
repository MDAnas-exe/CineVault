import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import PageContentWrapper from "../components/ui/PageContentWrapper";
import SectionState from "../components/ui/SectionState";
import ReviewCard from "../features/movie/components/ReviewCard";
import ReviewCardSkeleton from "../features/movie/components/ReviewCardSkeleton";
import emptySign from "../assets/images/reel.png";
import errorSign from "../assets/images/errorSign.png";

const UserReviewsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user-reviews"],
    queryFn: () => apiRequest({ endpoint: "users/reviews", method: "GET" }),
  });

  const reviews = data?.reviews ?? [];

  if (isLoading) {
    return (
      <PageContentWrapper>
        <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
          Reviews
        </h1>
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      </PageContentWrapper>
    );
  }

  if (isError) {
    return (
      <PageContentWrapper>
        <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
          Reviews
        </h1>
        <SectionState
          imageSource={errorSign}
          buttonText="Retry"
          message="Couldn't load reviews."
          description="Please check your connection and try again."
          onRetry={refetch}
        />
      </PageContentWrapper>
    );
  }

  if (reviews.length === 0) {
    return (
      <PageContentWrapper>
        <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
          Reviews
        </h1>
        <SectionState
          imageSource={emptySign}
          message="No reviews yet."
          description="Reviews you write will appear here."
        />
      </PageContentWrapper>
    );
  }

  return (
    <PageContentWrapper>
      <h1 className="mb-5 border-l-4 border-accent px-2 font-poppins text-2xl font-bold text-primary lg:text-4xl">
        Reviews
      </h1>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review.movieId}
            className="cursor-pointer rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => navigate(`/movies/${review.movieId}/reviews`)}
          >
            <ReviewCard reviewInfo={review} isOwner={false} />
          </div>
        ))}
      </div>
    </PageContentWrapper>
  );
};

export default UserReviewsPage;

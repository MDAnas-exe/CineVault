import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import apiRequest from "../utils/apiRequest";
import PageContentWrapper from "../components/ui/PageContentWrapper";
import UserReviewCard from "../features/user-review/components/UserReviewCard";
import UserReviewCardSkeleton from "../features/user-review/components/UserReviewCardSkeleton";
import ReviewFilters from "../features/user-review/components/ReviewFilters";
import ReviewListFeedback from "../features/user-review/components/ReviewListFeedback";

const UserReviewsPage = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user-reviews"],
    queryFn: () => apiRequest({ endpoint: "users/reviews", method: "GET" }),
  });

  const reviews = data?.reviews ?? [];

  return (
    <PageContentWrapper className="max-w-400 px-4 py-6 md:px-8 md:py-8 lg:w-full xl:px-10">
      <header className="mb-6 md:mb-7">
        <h1 className="border-l-4 border-accent pl-4 font-poppins text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
          Reviews
        </h1>
        <div className="mt-3 font-inter text-sm text-secondary md:text-base" aria-live="polite">
          {isLoading ? (
            <span aria-label="Loading review count"><Skeleton width={90} /></span>
          ) : data && !isError ? (
            `${data.totalResults} ${data.totalResults === 1 ? "review" : "reviews"}`
          ) : null}
        </div>
      </header>

      <ReviewFilters disabled />

      <section className="mt-4" aria-label="Your reviews" aria-busy={isLoading}>
        {isLoading ? (
          <>
            <p role="status" className="sr-only">Loading reviews...</p>
            <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <UserReviewCardSkeleton key={index} />
              ))}
            </div>
          </>
        ) : isError ? (
          <ReviewListFeedback state="error" onRetry={refetch} />
        ) : reviews.length === 0 ? (
          <ReviewListFeedback state="empty" />
        ) : (
          <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
            {reviews.map((review) => (
              <UserReviewCard key={review.movieId} reviewInfo={review} />
            ))}
          </div>
        )}
      </section>
    </PageContentWrapper>
  );
};

export default UserReviewsPage;

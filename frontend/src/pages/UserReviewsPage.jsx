import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import apiRequest from "../utils/apiRequest";
import PageContentWrapper from "../components/ui/PageContentWrapper";
import UserReviewCard from "../features/user-review/components/UserReviewCard";
import UserReviewCardSkeleton from "../features/user-review/components/UserReviewCardSkeleton";
import ReviewFilters from "../features/user-review/components/ReviewFilters";
import SectionState from "../components/ui/SectionState";
import emptySign from "../assets/images/reel.png";
import errorSign from "../assets/images/errorSign.png";

const UserReviewsPage = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user-reviews"],
    queryFn: () => apiRequest({ endpoint: "users/reviews", method: "GET" }),
  });

  const reviews = data?.reviews ?? [];

  const header = (
    <>
      <header className="mb-6 md:mb-7">
        <h1 className="border-l-4 border-accent pl-4 font-poppins text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
          Reviews
        </h1>
        <div className="mt-3 font-inter text-sm text-secondary md:text-base" aria-live="polite">
          {isLoading && (
            <span aria-label="Loading review count"><Skeleton width={90} /></span>
          )}
          {data && !isLoading && !isError && (
            `${data.totalResults} ${data.totalResults === 1 ? "review" : "reviews"}`
          )}
        </div>
      </header>

      <ReviewFilters disabled />
    </>
  );

  if (isLoading) {
    return (
      <PageContentWrapper className="max-w-400 px-4 py-6 md:px-8 md:py-8 lg:w-full xl:px-10">
        {header}
        <section className="mt-4" aria-label="Your reviews" aria-busy="true">
          <p role="status" className="sr-only">Loading reviews...</p>
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <UserReviewCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </PageContentWrapper>
    );
  }

  if (isError) {
    return (
      <PageContentWrapper className="max-w-400 px-4 py-6 md:px-8 md:py-8 lg:w-full xl:px-10">
        {header}
        <div className="py-10 md:py-14">
          <SectionState
            imageSource={errorSign}
            message="Couldn't load reviews."
            description="Please check your connection and try again."
            buttonText="Retry"
            onRetry={refetch}
          />
        </div>
      </PageContentWrapper>
    );
  }

  if (reviews.length === 0) {
    return (
      <PageContentWrapper className="max-w-400 px-4 py-6 md:px-8 md:py-8 lg:w-full xl:px-10">
        {header}
        <div className="py-10 md:py-14">
          <SectionState
            imageSource={emptySign}
            message="No reviews yet."
            description="Reviews you write will appear here."
          />
        </div>
      </PageContentWrapper>
    );
  }

  return (
    <PageContentWrapper className="max-w-400 px-4 py-6 md:px-8 md:py-8 lg:w-full xl:px-10">
      {header}
      <section className="mt-4" aria-label="Your reviews">
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <UserReviewCard key={review.movieId} reviewInfo={review} />
          ))}
        </div>
      </section>
    </PageContentWrapper>
  );
};

export default UserReviewsPage;

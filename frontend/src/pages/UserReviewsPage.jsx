import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import PageContentWrapper from "../components/ui/PageContentWrapper";
import UserReviewCard from "../features/user-review/components/UserReviewCard";
import UserReviewCardSkeleton from "../features/user-review/components/UserReviewCardSkeleton";
import ReviewFilters from "../features/user-review/components/ReviewFilters";
import SectionState from "../components/ui/SectionState";
import Reel from "../assets/images/reel.svg?react";
import emptySign from "../assets/images/reel.png";
import errorSign from "../assets/images/errorSign.png";

const UserReviewsPage = () => {
  const [searchParams] = useSearchParams();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ["user-reviews", searchParams.toString()],
    queryFn: ({ pageParam }) =>
      apiRequest({
        endpoint: `users/reviews?${searchParams.toString()}&page=${pageParam}`,
        method: "GET",
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.reviews),
  });

  const reviews = data ?? [];

  const header = (
    <>
      <ReviewFilters />
      <header className="mb-6 md:mb-7">
        <h1 className="border-l-4 border-accent pl-4 font-poppins text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
          Reviews
        </h1>
      </header>
    </>
  );

  if (isLoading) {
    return (
      <PageContentWrapper className="max-w-400 px-4 py-6 md:px-8 md:py-8 lg:w-full xl:px-10">
        {header}
        <section className="mt-4" aria-label="Your reviews" aria-busy="true">
          <p role="status" className="sr-only">
            Loading reviews...
          </p>
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
      {isFetchingNextPage && (
        <Reel className="size-8 animate-spin self-center text-accent lg:size-15" />
      )}
      {isFetchNextPageError && (
        <SectionState
          message="Failed to load more reviews."
          buttonText="Retry"
          onRetry={fetchNextPage}
        />
      )}
    </PageContentWrapper>
  );
};

export default UserReviewsPage;


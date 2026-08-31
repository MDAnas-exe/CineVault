import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import apiRequest from "../utils/apiRequest";
import PageContentWrapper from "../components/ui/PageContentWrapper";
import UserReviewCard from "../features/user-review/components/UserReviewCard";
import UserReviewCardSkeleton from "../features/user-review/components/UserReviewCardSkeleton";
import ReviewFilters from "../features/user-review/components/ReviewFilters";
import SectionState from "../components/ui/SectionState";
import Reel from "../assets/images/reel.svg?react";
import emptySign from "../assets/images/reel.png";
import errorSign from "../assets/images/errorSign.png";
import { useCallback, useRef } from "react";

const UserReviewsPage = () => {
  const [searchParams] = useSearchParams();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
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
    select: (data) => ({
      totalResults: data?.pages?.[0]?.totalResults,
      reviews: data.pages.flatMap((page) => page.reviews),
    }),
  });

  const observerRef = useRef(null);
  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
          },
          { threshold: 0.2 },
        );
        observerRef.current.observe(node);
      }
    },
    [hasNextPage, fetchNextPage],
  );

  const reviews = data?.reviews ?? [];
  const totalResults = data?.totalResults;

  const header = (
    <>
      <header className="mb-5 sm:mb-6">
        <h1 className="border-l-4 border-accent pl-3 font-poppins text-2xl font-bold text-primary sm:pl-4 sm:text-3xl md:text-4xl">
          Reviews
        </h1>
        <div
          className="mt-1.5 font-inter text-xs text-secondary sm:mt-2 sm:text-sm md:text-base"
          aria-live="polite"
        >
          {isLoading && (
            <span aria-label="Loading review count">
              <Skeleton width={90} />
            </span>
          )}
          {data &&
            !isLoading &&
            !isError &&
            `${totalResults ?? 0} ${totalResults === 1 ? "review" : "reviews"}`}
        </div>
      </header>
      <ReviewFilters />
    </>
  );

  if (isLoading) {
    return (
      <PageContentWrapper className="max-w-400 px-4 py-5 sm:py-6 md:px-6 md:py-8 lg:w-full xl:px-8">
        {header}
        <section className="mt-4" aria-label="Your reviews" aria-busy="true">
          <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
      <PageContentWrapper className="max-w-400 px-4 py-5 sm:py-6 md:px-6 md:py-8 lg:w-full xl:px-8">
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
      <PageContentWrapper className="max-w-400 px-4 py-5 sm:py-6 md:px-6 md:py-8 lg:w-full xl:px-8">
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
    <PageContentWrapper className="max-w-400 px-4 py-5 sm:py-6 md:px-6 md:py-8 lg:w-full xl:px-8">
      {header}
      <section className="mt-4" aria-label="Your reviews">
        <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reviews.map((review, i) => (
            <UserReviewCard
              key={review.movieId}
              reviewInfo={review}
              ref={i === reviews.length - 1 ? sentinelRef : null}
            />
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

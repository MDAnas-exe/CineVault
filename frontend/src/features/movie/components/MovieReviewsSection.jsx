import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiRequest from "../../../utils/apiRequest";
import SectionSubheading from "../../../components/ui/SectionSubheading";
import SectionState from "../../../components/ui/SectionState";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import Button from "../../../components/ui/Button";
import Reel from "../../../assets/images/reel.svg?react";
import useAuth from "../../../hooks/useAuth.js";

const MovieReviewsSection = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();

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
    queryKey: ["movie-reviews", id],
    queryFn: ({ pageParam, signal }) =>
      apiRequest({
        method: "GET",
        endpoint: `movies/${id}/reviews?page=${pageParam}`,
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const { data: userReview } = useQuery({
    queryKey: ["user-review", id],
    queryFn: ({ signal }) =>
      apiRequest({
        method: "GET",
        endpoint: `users/reviews/${id}`,
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      }),
    enabled: isLoggedIn && !!id,
    retry: false,
  });

  const reviews = data?.pages.flatMap((page) => page.reviews) ?? [];
  const totalResults = data?.pages[0]?.totalResults ?? 0;

  if (isLoading) {
    return (
      <div className="mt-8 md:mt-12">
        <SectionSubheading>Community Reviews</SectionSubheading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8 md:mt-12">
        <SectionSubheading>Community Reviews</SectionSubheading>
        <SectionState
          message="Failed to load reviews"
          description="Something went wrong. Please try again."
          buttonText="Try Again"
          onRetry={refetch}
        />
      </div>
    );
  }

  if (totalResults === 0) {
    const hasUserReviewed = !!userReview?.review;

    return (
      <div className="mt-8 md:mt-12">
        <SectionSubheading>Community Reviews</SectionSubheading>
        <SectionState
          message={hasUserReviewed ? "No other reviews yet" : "No reviews yet"}
          description={
            hasUserReviewed
              ? "You're the first one to share your thoughts!"
              : "Be the first to share your thoughts!"
          }
        />
      </div>
    );
  }

  return (
    <div className="mt-8 md:mt-12">
      <SectionSubheading>Community Reviews</SectionSubheading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review._id} reviewInfo={review} isOwner={false} />
        ))}
      </div>

      {isFetchingNextPage && (
        <Reel className="mx-auto mt-6 size-8 animate-spin text-accent lg:size-10" />
      )}

      {isFetchNextPageError && (
        <div className="mt-6">
          <SectionState
            message="Failed to load more reviews."
            buttonText="Retry"
            onRetry={fetchNextPage}
          />
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && !isFetchNextPageError && (
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            className="rounded-lg border border-gray-200 px-5 py-2 font-inter text-sm font-medium text-primary hover:bg-neutral-50"
            onClick={fetchNextPage}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default MovieReviewsSection;

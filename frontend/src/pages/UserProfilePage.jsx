import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import apiRequest from "../utils/apiRequest";
import useAuth from "../hooks/useAuth";
import PageContentWrapper from "../components/layout/PageContentWrapper";
import MovieCard from "../components/ui/MovieCard";
import MovieSectionSkeleton from "../components/ui/skeletons/MovieSectionSkeleton";
import SectionState from "../components/ui/SectionState";
import UserReviewCard from "../features/user-review/components/UserReviewCard";
import UserReviewCardSkeleton from "../features/user-review/components/UserReviewCardSkeleton";
import ProfileActivitySection from "../features/user-profile/components/ProfileActivitySection";
import ProfileStats from "../features/user-profile/components/ProfileStats";
import emptySign from "../assets/images/reel.avif";
import errorSign from "../assets/images/errorSign.avif";
import { useEffect } from "react";

const formatJoinDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const getMovieActivityContent = ({
  data,
  isLoading,
  isError,
  refetch,
  emptyMessage,
  emptyDescription,
  errorMessage,
}) => {
  if (isLoading) {
    return <MovieSectionSkeleton count={10} showTitle={false} />;
  }

  if (isError) {
    return (
      <SectionState
        imageSource={errorSign}
        message={errorMessage}
        description="Please check your connection and try again."
        buttonText="Retry"
        onRetry={refetch}
      />
    );
  }

  const movies = data?.movies ?? [];
  if (movies.length === 0) {
    return (
      <SectionState
        imageSource={emptySign}
        message={emptyMessage}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="flex w-max gap-3 sm:gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.movieId}
          movie={{ ...movie, id: movie.movieId }}
          showActions={false}
        />
      ))}
    </div>
  );
};

const getReviewActivityContent = ({ data, isLoading, isError, refetch }) => {
  if (isLoading) {
    return (
      <div className="flex w-max gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-72 shrink-0 sm:w-84 lg:w-96">
            <UserReviewCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <SectionState
        imageSource={errorSign}
        message="Couldn't load recent reviews."
        description="Please check your connection and try again."
        buttonText="Retry"
        onRetry={refetch}
      />
    );
  }

  const reviews = data?.reviews ?? [];
  if (reviews.length === 0) {
    return (
      <SectionState
        imageSource={emptySign}
        message="No reviews yet."
        description="Reviews you write will appear here."
      />
    );
  }

  return (
    <div className="flex w-max gap-4">
      {reviews.map((review) => (
        <div key={review.movieId} className="w-72 shrink-0 sm:w-84 lg:w-96">
          <UserReviewCard reviewInfo={review} />
        </div>
      ))}
    </div>
  );
};

const UserProfilePage = () => {
  const { user, isLoading: isUserLoading } = useAuth();
  const joinedDate = formatJoinDate(user?.createdAt);

  useEffect(() => {
    document.title = user?.name
      ? `${user.name.split(" ")[0]}'s Profile | CineVault`
      : "User's Profile | CineVault";
  }, [user]);

  const likedQuery = useQuery({
    queryKey: ["profile-activity", "liked"],
    queryFn: ({ signal }) =>
      apiRequest({
        endpoint: "users/liked?sortBy=dateAdded&order=desc&limit=10",
        method: "GET",
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      }),
  });

  const watchedQuery = useQuery({
    queryKey: ["profile-activity", "watched"],
    queryFn: ({ signal }) =>
      apiRequest({
        endpoint: "users/watched?sortBy=dateAdded&order=desc&limit=10",
        method: "GET",
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      }),
  });

  const watchlistedQuery = useQuery({
    queryKey: ["profile-activity", "watchlisted"],
    queryFn: ({ signal }) =>
      apiRequest({
        endpoint: "users/watchlisted?sortBy=dateAdded&order=desc&limit=10",
        method: "GET",
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      }),
  });

  const reviewsQuery = useQuery({
    queryKey: ["profile-activity", "reviews"],
    queryFn: ({ signal }) =>
      apiRequest({
        endpoint: "users/reviews?page=1&limit=10&sortBy=createdAt&order=desc",
        method: "GET",
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      }),
  });

  return (
    <PageContentWrapper className=" w-full md:w-[90%] xl:px-8">
      <header className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-6 md:flex-row md:items-center sm:pb-8">
        <div>
          {isUserLoading ? (
            <>
              <Skeleton width={180} height={40} />
              <Skeleton width={250} height={20} className="mt-2" />
            </>
          ) : (
            <>
              <h1 className="font-poppins text-3xl font-bold text-primary sm:text-4xl">
                {user?.name}
              </h1>
              <p className="mt-1 font-inter text-sm text-secondary sm:text-base">
                {user?.email}
              </p>
              {joinedDate && (
                <p className="mt-1 font-inter text-sm text-secondary">
                  Member since {joinedDate}
                </p>
              )}
            </>
          )}
        </div>
        <ProfileStats />
      </header>

      <div className="mt-8 sm:mt-10">
        <ProfileActivitySection title="Recently Liked" viewAllTo="/users/liked">
          {getMovieActivityContent({
            ...likedQuery,
            emptyMessage: "No liked movies yet.",
            emptyDescription: "Movies you like will appear here.",
            errorMessage: "Couldn't load liked movies.",
          })}
        </ProfileActivitySection>

        <ProfileActivitySection
          title="Recently Watched"
          viewAllTo="/users/watched"
        >
          {getMovieActivityContent({
            ...watchedQuery,
            emptyMessage: "No watched movies yet.",
            emptyDescription: "Movies you mark as watched will appear here.",
            errorMessage: "Couldn't load watched movies.",
          })}
        </ProfileActivitySection>

        <ProfileActivitySection
          title="Recently Watchlisted"
          viewAllTo="/users/watchlisted"
        >
          {getMovieActivityContent({
            ...watchlistedQuery,
            emptyMessage: "Your watchlist is empty.",
            emptyDescription:
              "Movies you add to your watchlist will appear here.",
            errorMessage: "Couldn't load watchlisted movies.",
          })}
        </ProfileActivitySection>

        <ProfileActivitySection
          title="Recently Reviewed"
          viewAllTo="/users/reviews"
        >
          {getReviewActivityContent(reviewsQuery)}
        </ProfileActivitySection>
      </div>
    </PageContentWrapper>
  );
};

export default UserProfilePage;

import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import apiRequest from "../utils/apiRequest";
import useAuth from "../hooks/useAuth";
import PageContentWrapper from "../components/ui/PageContentWrapper";
import MovieCard from "../components/ui/MovieCard";
import MovieSectionSkeleton from "../components/ui/MovieSectionSkeleton";
import SectionState from "../components/ui/SectionState";
import UserReviewCard from "../features/user-review/components/UserReviewCard";
import UserReviewCardSkeleton from "../features/user-review/components/UserReviewCardSkeleton";
import ProfileActivitySection from "../features/user-profile/components/ProfileActivitySection";
import emptySign from "../assets/images/reel.png";
import errorSign from "../assets/images/errorSign.png";
import { FaRegHeart, FaRegBookmark, FaRegEye } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
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

  const profileQuery = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => apiRequest({ endpoint: "users/profile", method: "GET" }),
    select: (data) => data.stats,
  });

  const likedQuery = useQuery({
    queryKey: ["profile-activity", "liked"],
    queryFn: () =>
      apiRequest({
        endpoint: "users/liked?sortBy=dateAdded&order=desc&limit=10",
        method: "GET",
      }),
  });

  const watchedQuery = useQuery({
    queryKey: ["profile-activity", "watched"],
    queryFn: () =>
      apiRequest({
        endpoint: "users/watched?sortBy=dateAdded&order=desc&limit=10",
        method: "GET",
      }),
  });

  const watchlistedQuery = useQuery({
    queryKey: ["profile-activity", "watchlisted"],
    queryFn: () =>
      apiRequest({
        endpoint: "users/watchlisted?sortBy=dateAdded&order=desc&limit=10",
        method: "GET",
      }),
  });

  const reviewsQuery = useQuery({
    queryKey: ["profile-activity", "reviews"],
    queryFn: () =>
      apiRequest({
        endpoint: "users/reviews?page=1&limit=10&sortBy=createdAt&order=desc",
        method: "GET",
      }),
  });

  const stats = profileQuery.data;
  const statItems = [
    { label: "Watched", value: stats?.watchedCount, icon: FaRegHeart },
    { label: "Liked", value: stats?.likedCount, icon: FaRegBookmark },
    { label: "Watchlisted", value: stats?.watchlistedCount, icon: FaRegEye },
    { label: "Reviews", value: stats?.reviewCount, icon: FaRegMessage },
  ];

  return (
    <PageContentWrapper className="max-w-400 px-4 py-5 sm:px-6 sm:py-8 lg:w-full xl:px-8">
      <header className="border-b border-neutral-200 pb-6 sm:pb-8">
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
      </header>

      <section className="mt-6" aria-labelledby="profile-stats-heading">
        <h2 id="profile-stats-heading" className="sr-only">
          Profile statistics
        </h2>
        {profileQuery.isLoading && (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} height={104} borderRadius={12} />
            ))}
          </div>
        )}
        {profileQuery.isError && (
          <SectionState
            imageSource={errorSign}
            message="Couldn't load profile statistics."
            description="Please check your connection and try again."
            buttonText="Retry"
            onRetry={profileQuery.refetch}
          />
        )}
        {stats && !profileQuery.isLoading && !profileQuery.isError && (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {statItems.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-5 text-center shadow-sm flex items-center flex-col justify-center"
              >
                <Icon className="text-2xl text-accent mb-1" />
                <span className="font-poppins text-2xl font-bold text-accent sm:text-3xl">
                  {value ?? 0}
                </span>
                <span className="font-inter text-sm text-secondary">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 sm:mt-10">
        <ProfileActivitySection title="Last 10 liked" viewAllTo="/users/liked">
          {getMovieActivityContent({
            ...likedQuery,
            emptyMessage: "No liked movies yet.",
            emptyDescription: "Movies you like will appear here.",
            errorMessage: "Couldn't load liked movies.",
          })}
        </ProfileActivitySection>

        <ProfileActivitySection
          title="Last 10 watched"
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
          title="Last 10 watchlisted"
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
          title="Last 10 reviews"
          viewAllTo="/users/reviews"
        >
          {getReviewActivityContent(reviewsQuery)}
        </ProfileActivitySection>
      </div>
    </PageContentWrapper>
  );
};

export default UserProfilePage;

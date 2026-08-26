export const USER_MOVIE_STATUSES = ["liked", "watchlisted", "watched"];

export const USER_MOVIE_COLLECTIONS = {
  liked: {
    path: "/users/liked",
    title: "Liked Movies",
    shortLabel: "Liked",
    navLabel: "Liked Movies",
    emptyMessage: "You haven't liked any movies yet.",
    emptyFilteredMessage: "No liked movies match your filters.",
    emptyDescription: "Movies you like will appear here.",
    emptyFilteredDescription:
      "Try adjusting or clearing your filters to see more liked movies.",
  },
  watched: {
    path: "/users/watched",
    title: "Watched Movies",
    shortLabel: "Watched",
    navLabel: "Watched Movies",
    emptyMessage: "You haven't marked any movies as watched yet.",
    emptyFilteredMessage: "No watched movies match your filters.",
    emptyDescription: "Movies you mark as watched will appear here.",
    emptyFilteredDescription:
      "Try adjusting or clearing your filters to see more watched movies.",
  },
  watchlisted: {
    path: "/users/watchlisted",
    title: "Watchlist",
    shortLabel: "Watchlist",
    navLabel: "Watchlist",
    emptyMessage: "Your watchlist is empty.",
    emptyFilteredMessage: "No watchlisted movies match your filters.",
    emptyDescription: "Movies you add to your watchlist will appear here.",
    emptyFilteredDescription:
      "Try adjusting or clearing your filters to see more watchlisted movies.",
  },
};

export const getUserMovieActions = (id, movie) =>
  USER_MOVIE_STATUSES.map((status) => ({
    status,
    endpoint: `users/${status}/${id}`,
    isActive: Boolean(movie?.[status]),
  }));

export const USER_MOVIE_STATUSES = ["liked", "watchlisted", "watched"];

export const USER_MOVIE_COLLECTIONS = {
  liked: {
    path: "/users/liked",
    title: "Liked Movies",
    shortLabel: "Liked",
    navLabel: "Liked Movies",
    emptyMessage: "You haven't liked any movies yet.",
  },
  watched: {
    path: "/users/watched",
    title: "Watched Movies",
    shortLabel: "Watched",
    navLabel: "Watched Movies",
    emptyMessage: "You haven't marked any movies as watched yet.",
  },
  watchlisted: {
    path: "/users/watchlisted",
    title: "Watchlist",
    shortLabel: "Watchlist",
    navLabel: "Watchlist",
    emptyMessage: "Your watchlist is empty.",
  },
};

export const getUserMovieActions = (id, movie) =>
  USER_MOVIE_STATUSES.map((status) => ({
    status,
    endpoint: `users/${status}/${id}`,
    isActive: Boolean(movie?.[status]),
  }));

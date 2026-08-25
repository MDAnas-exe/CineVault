export const USER_MOVIE_FILTERS = {
  sortBy: {
    title: "Sort by",
    options: [
      { label: "Title", value: "title" },
      { label: "Release date", value: "releaseDate" },
      { label: "Popularity", value: "popularity" },
      { label: "Date added", value: "dateAdded" },
    ],
  },
  order: {
    title: "Order",
    options: [
      { label: "Ascending", value: "asc" },
      { label: "Descending", value: "desc" },
    ],
  },
  liked: {
    title: "Liked",
    options: [
      { label: "All", value: "all" },
      { label: "Liked", value: true },
      { label: "Not liked", value: false },
    ],
  },
};

export const DEFAULT_FILTERS = {
  fromYear: 1900,
  toYear: 2100,
  sortBy: "title",
  order: "asc",
  liked: "all",
};

export const USER_MOVIE_FILTER_GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

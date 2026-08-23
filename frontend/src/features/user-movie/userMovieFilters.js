export const USER_MOVIE_FILTERS = {
  sortBy: {
    title: "Sort by",
    options: [
      { label: "Title", value: "title", isDefault: true },
      { label: "Release date", value: "releaseDate" },
      { label: "Popularity", value: "popularity" },
      { label: "Date added", value: "dateAdded" },
    ],
  },
  order: {
    title: "Order",
    options: [
      { label: "Ascending", value: "asc", isDefault: true },
      { label: "Descending", value: "desc" },
    ],
  },
  liked: {
    title: "Liked",
    options: [
      { label: "All", value: "all", isDefault: true },
      { label: "Liked", value: "liked" },
      { label: "Not liked", value: "notLiked" },
    ],
  },
};

export const USER_MOVIE_FILTER_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];

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
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

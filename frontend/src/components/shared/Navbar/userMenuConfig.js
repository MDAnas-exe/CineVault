import { USER_MOVIE_COLLECTIONS } from "../../../constants/userMovie";

const getCollectionLink = (status, className = "") => ({
  to: USER_MOVIE_COLLECTIONS[status].path,
  label: USER_MOVIE_COLLECTIONS[status].navLabel,
  className,
  preserveQuery: true,
});

const getPrimaryCollectionLink = (status) => ({
  to: USER_MOVIE_COLLECTIONS[status].path,
  label: USER_MOVIE_COLLECTIONS[status].shortLabel,
  preserveQuery: true,
});

export const USER_MENU_LINKS = [
  { to: "/users/profile", label: "View Profile" },
  getCollectionLink("watched", "block lg:hidden"),
  getCollectionLink("watchlisted", "block lg:hidden"),
  getCollectionLink("liked"),
  { to: "/users/reviews", label: "Reviews" },
];

export const PRIMARY_USER_MENU_LINKS = [
  getPrimaryCollectionLink("watched"),
  getPrimaryCollectionLink("watchlisted"),
];

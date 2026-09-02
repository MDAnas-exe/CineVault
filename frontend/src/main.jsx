import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthLayout from "./components/layout/AuthLayout.jsx";
import RootLayout from "./components/layout/RootLayout.jsx";
import UserLayout from "./components/layout/UserLayout.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultPage.jsx"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const EmailVerification = lazy(() => import("./pages/EmailVerification.jsx"));
const UserMovieCollectionPage = lazy(
  () => import("./pages/UserMovieCollectionPage.jsx"),
);
const UserReviewsPage = lazy(() => import("./pages/UserReviewsPage.jsx"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage.jsx"));

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetailsPage />,
      },
      {
        path: "/movies/:id/:tab",
        element: <MovieDetailsPage />,
      },
      {
        path: "/search",
        element: <SearchResultsPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify-email",
        element: <EmailVerification />,
      },
    ],
  },
  {
    element: <UserLayout />,
    children: [
      { path: "/users/profile", element: <UserProfilePage /> },
      { path: "/users/reviews", element: <UserReviewsPage /> },
      { path: "/users/:status", element: <UserMovieCollectionPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

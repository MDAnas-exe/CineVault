import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import RootLayout from "./components/layout/RootLayout.jsx";
import UserLayout from "./components/layout/UserLayout.jsx";
import Home from "./pages/Home.jsx";
import SearchResultsPage from "./pages/SearchResultPage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import UserMovieCollectionPage from "./pages/UserMovieCollectionPage.jsx";
import UserReviewsPage from "./pages/UserReviewsPage.jsx";
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
      { path: "/users/profile", element: <div>user profile</div> },
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

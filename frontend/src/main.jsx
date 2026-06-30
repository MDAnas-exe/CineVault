import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import SearchResults from "./pages/SearchResultPage.jsx";
import MovieDetails from "./features/movie/pages/MovieDetails.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <SearchResults /> },
      { path: "movie/:id", element: <MovieDetails /> },
      { path: "user/watchlist", element: <h1>Testing</h1> },
      { path: "user/history", element: <h1>Testing</h1> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

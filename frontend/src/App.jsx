import React from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { MovieProvider } from "./context/MovieSearchResultContext";
import { SearchLoadingStatusProvider } from "./context/SearchLoading";
import "./App.css";

const App = () => {
  return (
    <SearchLoadingStatusProvider>
      <MovieProvider>
        <Navbar />
        <MovieCard />
      </MovieProvider>
    </SearchLoadingStatusProvider>
  );
};

export default App;

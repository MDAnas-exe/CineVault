import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { movieSearchResult } from "./context/MovieSearchResultContext";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);

  return (
    <movieSearchResult.Provider value={{ movies, setMovies }}>
      <Navbar />
      <MovieCard />
    </movieSearchResult.Provider>
  );
};

export default App;

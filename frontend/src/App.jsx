import React from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { MovieProvider } from "./context/MovieSearchResultContext";
import "./App.css";

const App = () => {
  return (
    <MovieProvider>
      <Navbar />
      <MovieCard />
    </MovieProvider>
  );
};

export default App;

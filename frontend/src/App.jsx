import React from "react";
import Navbar from "./components/Navbar";

import { MovieProvider } from "./context/MovieSearchResultContext";
import "./App.css";
import SearchResults from "./components/SearchResults";

const App = () => {
  return (
    <MovieProvider>
      <Navbar />
      <SearchResults />
    </MovieProvider>
  );
};

export default App;

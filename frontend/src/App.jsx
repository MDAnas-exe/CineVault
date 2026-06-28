import React from "react";
import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SearchResults from "./features/search/components/SearchResults";
import MovieDetails from "./features/movie/pages/MovieDetails";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/user/watchlist" element={<h1>Testing</h1>} />
        <Route path="/user/history" element={<h1>Testing</h1>} />
      </Routes>
    </>
  );
};

export default App;

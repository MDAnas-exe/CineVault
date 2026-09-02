import HeroSection from "../features/movie/components/HeroSection";
import TabNavigation from "../features/movie/components/TabNavigation";
import useMovieDetails from "../features/movie/hooks/useMovieDetails.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const { id } = useParams();

  const { data: movie } = useMovieDetails(id);

  useEffect(() => {
    if (movie?.title) {
      document.title = `${movie.title} | CineVault`;
    } else document.title = `Movie Details | CineVault`;
  }, [movie]);

  return (
    <div>
      <HeroSection />
      <div className="relative md:-top-4 top-2 md:w-[90%] w-[95%] mx-auto">
        <TabNavigation />
      </div>
    </div>
  );
};

export default MovieDetailsPage;

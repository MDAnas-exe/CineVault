import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeroSection from "../features/movie/components/HeroSection";
import TabNavigation from "../features/movie/components/TabNavigation";
const MovieDetailsPage = () => {
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

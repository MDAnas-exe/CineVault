import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetailsHeroSection from "../components/MovieDetailsHeroSection";
const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovieDetails] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchMovieDetails() {
      if (!parseInt(id)) {
        setMovieDetails(null);
        setError("");
        navigate("/");
      }
      try {
        let response = await fetch(
          `http://localhost:3000/movie/${id}?language=en-US`,
        );
        if (!response.ok) {
          throw new Error(
            "Unable to fetch MovieDetails please try again later",
          );
        }
        let result = await response.json();
        setMovieDetails(result);
      } catch (error) {
        setMovieDetails(null);
        setError(error.message);
      }
    }
    fetchMovieDetails();
  }, [id]);
  return (
    movie && (
      <div className="bg-[#f4f1ec] min-w-275 font-sans text-[#1a1a1a]">
        <MovieDetailsHeroSection movie={movie} />

        {/* BODY */}
        <div className="flex gap-10 px-14 py-10">
          <div className="flex-1">
            {/* CAST */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <h2
                  style={{ fontFamily: "Georgia, serif" }}
                  className="text-2xl font-bold"
                >
                  Cast
                </h2>
                <button className="text-sm text-[#9e9790] underline">
                  View all
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[
                  {
                    img: "https://image.tmdb.org/t/p/w185/dMRRCQYJumzBxcfEHiJHMfpAHuH.jpg",
                    name: "Matthew McConaughey",
                    char: "Cooper",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/lDSJSvFcBkWpRvusMw3VXNKQ9mU.jpg",
                    name: "Anne Hathaway",
                    char: "Brand",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/sNTn5waAMRhDM3Bh5VTJN2FKCSN.jpg",
                    name: "Jessica Chastain",
                    char: "Murph",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/ckO5BKJcHjgXxPuCbDpXJSmEUE3.jpg",
                    name: "Michael Caine",
                    char: "Professor Brand",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/eFDXmGrD5YUQJH9vI3w1p6B5fVc.jpg",
                    name: "Matt Damon",
                    char: "Dr. Mann",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/7MnH9IiWdtZqA5R9HUe7Rm0NcLD.jpg",
                    name: "Casey Affleck",
                    char: "Tom",
                  },
                ].map(({ img, name, char }) => (
                  <div key={name} className="shrink-0 w-28 text-center">
                    <img
                      src={img}
                      alt={name}
                      className="w-28 h-32 rounded-xl object-cover bg-[#e8e2d9]"
                    />
                    <div className="text-sm font-semibold mt-2 leading-tight">
                      {name}
                    </div>
                    <div className="text-xs text-[#9e9790] mt-0.5">{char}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* MORE LIKE THIS */}
            <div className="mt-10">
              <div className="flex justify-between items-center mb-5">
                <h2
                  style={{ fontFamily: "Georgia, serif" }}
                  className="text-2xl font-bold"
                >
                  More Like This
                </h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[
                  {
                    img: "https://image.tmdb.org/t/p/w185/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
                    title: "Inception",
                    year: "2010",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/HkZSFhGzhoznomBankiyNEBECy0.jpg",
                    title: "The Martian",
                    year: "2015",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
                    title: "Dune: Part Two",
                    year: "2024",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
                    title: "Arrival",
                    year: "2016",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                    title: "The Dark Knight",
                    year: "2008",
                  },
                  {
                    img: "https://image.tmdb.org/t/p/w185/kZ2nZw8D681Ics0gNQAGjnhfgaC.jpg",
                    title: "Gravity",
                    year: "2013",
                  },
                ].map(({ img, title, year }) => (
                  <div
                    key={title}
                    className="shrink-0 w-28 cursor-pointer group"
                  >
                    <img
                      src={img}
                      alt={title}
                      className="w-28 h-44 rounded-xl object-cover bg-[#e8e2d9] group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="text-sm font-semibold mt-2">{title}</div>
                    <div className="text-xs text-[#9e9790]">{year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR - REVIEWS */}
          <div className="w-64 shrink-0">
            <div className="flex justify-between items-center mb-5">
              <h2
                style={{ fontFamily: "Georgia, serif" }}
                className="text-2xl font-bold"
              >
                Reviews
              </h2>
              <button className="text-sm text-[#9e9790] underline">
                View all
              </button>
            </div>
            {[
              {
                initial: "C",
                color: "#d4a017",
                name: "cinephile_17",
                time: "2 weeks ago",
                rating: 5,
                text: "A masterpiece. Nolan's direction, the visuals, the score — everything about this film is next level. Gets better every time I watch it.",
                helpful: 124,
              },
              {
                initial: "M",
                color: "#4a7c6f",
                name: "movieman",
                time: "1 month ago",
                rating: 4,
                text: "Emotional, thought-provoking and visually stunning. The third act hits hard.",
                helpful: 67,
              },
              {
                initial: "F",
                color: "#7c4a6f",
                name: "filmlover_99",
                time: "3 months ago",
                rating: 5,
                text: "The best sci-fi movie of the decade. No other film even comes close.",
                helpful: 89,
              },
            ].map(({ initial, color, name, time, rating, text, helpful }) => (
              <div
                key={name}
                className="bg-white rounded-xl p-4 mb-3 border border-[#ede8e0]"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {initial}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{name}</div>
                      <div className="text-xs text-[#9e9790]">{time}</div>
                    </div>
                  </div>
                  <div className="text-accent text-xs">
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)}
                    <span className="text-[#6b6560] ml-1">{rating}.0</span>
                  </div>
                </div>
                <p className="text-xs text-[#4a4540] leading-relaxed mt-2">
                  {text}
                </p>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs text-[#9e9790] cursor-pointer">
                    👍 Helpful {helpful}
                  </span>
                  <span className="text-xs text-[#9e9790] cursor-pointer">
                    💬 Reply
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieDetails;

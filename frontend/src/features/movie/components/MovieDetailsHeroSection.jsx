import React from "react";

const MovieDetailsHeroSection = ({ movie }) => {
  return (
    <div
      className="relative h-120 overflow-hidden"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(244,241,236,0.97) 38%, rgba(244,241,236,0.6) 65%, rgba(244,241,236,0.1) 100%)",
        }}
      />

      {/* Left content */}
      <div className="absolute inset-0 z-10 flex items-end px-14 pb-10 gap-8">
        <div className="w-40 h-60 rounded-xl overflow-hidden shrink-0 shadow-2xl">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="poster"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h1
              style={{ fontFamily: "Georgia, serif" }}
              className="text-5xl font-bold tracking-tight leading-none max-w-1/2"
            >
              {movie.title}
            </h1>
            <span className="text-2xl font-light text-[#6b6560]">
              {movie.release_date.split("-")[0]}
            </span>
          </div>
          <div className="flex gap-3 mt-2 text-sm text-[#6b6560] items-center">
            <span>
              {movie.release_dates.results.find((c) => c.iso_3166_1 === "IN")
                .release_dates[0].certification || "N/A"}
            </span>
            <span className="text-[#c4bdb5]">·</span>
            <span>
              {parseInt(movie.runtime / 60)}hr {movie.runtime % 60} mins
            </span>
            <span className="text-[#c4bdb5]">·</span>
            <div>{movie.genres.map((g) => g.name).join(", ")}.</div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-accent text-xl">★</span>
            <span
              style={{ fontFamily: "Georgia, serif" }}
              className="text-3xl font-bold"
            >
              {parseInt(movie.vote_average) / 2 || "N/A"}
            </span>
            <span className="text-sm text-[#9e9790]">/ 5</span>
            <span className="text-sm text-[#9e9790] ml-1">
              {movie.vote_count >= 1000000
                ? `(${movie.vote_count}/1000000)M`
                : movie.vote_count >= 1000
                  ? `(${movie.vote_count}/1000)k`
                  : movie.vote_count}{" "}
              ratings
            </span>
          </div>
          <div className="italic text-[#6b6560] text-sm mt-3 border-l-4 border-accent pl-3">
            {movie.tagline}
          </div>
          <p className="text-sm text-[#3d3830] leading-relaxed mt-2 max-w-lg">
            {movie.overview}
          </p>
          <div className="flex gap-3 mt-5">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-white border border-[#d6cfc5] hover:bg-[#eee8df] transition-colors">
              ＋ Watchlist
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-white border border-[#d6cfc5] hover:bg-[#eee8df] transition-colors">
              ♡ Favorite
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#1a1a1a] text-white hover:bg-[#333] transition-colors">
              ▶ Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Right side info */}
      <div className="absolute right-14 bottom-10 z-10 flex flex-col gap-3 w-48">
        {[
          {
            label: "Directed By",
            value:
              movie.credits.crew.find((c) => c.job === "Director")?.name ||
              "N/A",
          },
          {
            label: "Written By",
            value:
              movie.credits.crew.find((c) => c.job === "Screenplay")?.name ||
              "N/A",
          },
          {
            label: "Release Date",
            value: new Date(`${movie.release_date}`).toLocaleDateString(
              "en-US",
              { day: "2-digit", month: "long", year: "numeric" },
            ),
          },
          {
            label: "Budget",
            value: `$${(movie.budget / 1_000_000).toFixed(1)}M`,
          },
          {
            label: "Box Office",
            value: `$${(movie.revenue / 1_000_000).toFixed(1)}M`,
          },
        ].map(({ label, value }) => (
          <div key={label}>
            <div className="text-[11px] uppercase tracking-wide text-[#9e9790] font-medium">
              {label}
            </div>
            <div className="text-sm font-medium text-[#1a1a1a] mt-0.5 whitespace-pre-line">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailsHeroSection;

import React from "react";

const MovieDetails = () => {
  return (
    <div className="bg-[#f4f1ec] min-w-[1100px] font-sans text-[#1a1a1a]">
      {/* HERO */}
      <div
        className="relative h-[480px] overflow-hidden"
        style={{
          backgroundImage:
            "url('https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg')",
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
          <div className="w-40 h-60 rounded-xl overflow-hidden flex-shrink-0 shadow-2xl">
            <img
              src="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
              alt="poster"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <h1
                style={{ fontFamily: "Georgia, serif" }}
                className="text-5xl font-bold tracking-tight leading-none"
              >
                Interstellar
              </h1>
              <span className="text-2xl font-light text-[#6b6560]">2014</span>
            </div>
            <div className="flex gap-3 mt-2 text-sm text-[#6b6560] items-center">
              <span>PG-13</span>
              <span className="text-[#c4bdb5]">·</span>
              <span>2h 49m</span>
              <span className="text-[#c4bdb5]">·</span>
              <span>Sci-Fi, Adventure, Drama</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[#d4a017] text-xl">★</span>
              <span
                style={{ fontFamily: "Georgia, serif" }}
                className="text-3xl font-bold"
              >
                4.6
              </span>
              <span className="text-sm text-[#9e9790]">/ 5</span>
              <span className="text-sm text-[#9e9790] ml-1">1.2M ratings</span>
            </div>
            <div className="italic text-[#6b6560] text-sm mt-3 border-l-4 border-[#d4a017] pl-3">
              Mankind was born on Earth. It was never meant to die here.
            </div>
            <p className="text-sm text-[#3d3830] leading-relaxed mt-2 max-w-lg">
              A team of explorers travel through a wormhole in space in an
              attempt to ensure humanity's survival as the planet Earth becomes
              inhabitable.
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
            { label: "Directed by", value: "Christopher Nolan" },
            { label: "Written by", value: "Jonathan Nolan\nChristopher Nolan" },
            { label: "Release Date", value: "November 7, 2014" },
            { label: "Budget", value: "$165 million" },
            { label: "Box Office", value: "$733.1 million" },
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
                <div key={name} className="flex-shrink-0 w-28 text-center">
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
                  className="flex-shrink-0 w-28 cursor-pointer group"
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
        <div className="w-64 flex-shrink-0">
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
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {initial}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{name}</div>
                    <div className="text-xs text-[#9e9790]">{time}</div>
                  </div>
                </div>
                <div className="text-[#d4a017] text-xs">
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
  );
};

export default MovieDetails;

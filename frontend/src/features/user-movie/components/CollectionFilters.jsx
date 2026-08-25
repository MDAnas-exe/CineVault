import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { LuSlidersHorizontal } from "react-icons/lu";
import {
  DEFAULT_FILTERS,
  USER_MOVIE_FILTER_GENRES,
  USER_MOVIE_FILTERS,
} from "../userMovieFilters";
import Button from "../../../components/ui/Button";
import FilterRadioGroup from "./FilterRadioGroup";
import GenreChip from "./GenreChip";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const COLLAPSED_GENRE_CUTOFFS = [
  { visibleUpTo: 6, className: "" },
  { visibleUpTo: 8, className: "hidden sm:flex" },
  { visibleUpTo: 10, className: "hidden md:flex" },
  { visibleUpTo: 12, className: "hidden lg:flex" },
  { visibleUpTo: Infinity, className: "hidden xl:flex" },
];

const getCollapsedGenreClass = (index) =>
  COLLAPSED_GENRE_CUTOFFS.find(({ visibleUpTo }) => index < visibleUpTo)
    .className;

const filterGenres = Object.entries(USER_MOVIE_FILTER_GENRES)
  .map(([id, name]) => ({ id: Number(id), name }))
  .sort((firstGenre, secondGenre) =>
    firstGenre.name.localeCompare(secondGenre.name),
  );

const CollectionFilters = ({ status }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [areAllGenresShown, setAreAllGenresShown] = useState(false);
  const showLikedFilter = status === "watched";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { sortBy, order, fromYear, toYear, genres, liked } =
    Object.fromEntries(searchParams);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...DEFAULT_FILTERS,
      sortBy: sortBy || DEFAULT_FILTERS.sortBy,
      order: order || DEFAULT_FILTERS.order,
      fromYear: fromYear || DEFAULT_FILTERS.fromYear,
      toYear: toYear || DEFAULT_FILTERS.toYear,
      liked: liked || DEFAULT_FILTERS.liked,
    },
  });
  const [selectedGenresIds, setSelectedGenresIds] = useState(
    new Set(
      genres
        ?.split(",")
        .map(Number)
        .filter((genre) => USER_MOVIE_FILTER_GENRES[genre]),
    ),
  );

  function toggleGenres(id) {
    if (selectedGenresIds.size === 3 && !selectedGenresIds.has(id))
      return toast("only 3 genres can be selected at once");
    selectedGenresIds.has(id)
      ? setSelectedGenresIds((genres) => {
          let newGenres = new Set(genres);
          newGenres.delete(id);
          return newGenres;
        })
      : setSelectedGenresIds((genres) => {
          let newGenres = new Set(genres);
          newGenres.add(id);
          return newGenres;
        });
  }

  function addFilters(data) {
    let genres = [...selectedGenresIds].join(",");
    const queries = new URLSearchParams({
      ...data,
      ...(selectedGenresIds.size && { genres: genres }),
    });
    const hasDefaultFilters = Object.entries(DEFAULT_FILTERS).every(
      ([key, value]) => String(data[key]) === String(value),
    );

    if (!hasDefaultFilters || selectedGenresIds.size)
      navigate(window.location.pathname + "?" + queries);
  }

  return (
    <section className="mb-6 rounded-2xl border border-gray-200 border-l-4 border-l-accent bg-white shadow-sm sm:mb-10">
      <Button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="collection-filter-options"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        className={`flex w-full items-center justify-between  px-4 py-4 text-left text-primary hover:bg-amber-50/60 sm:px-6 sm:py-5 ${isExpanded && " sticky top-20 md:top-15 hover:bg-white bg-white border-b border-gray-200 "}`}
      >
        <span className="flex items-center gap-3 text-lg sm:text-xl">
          <LuSlidersHorizontal
            className="text-xl text-primary sm:text-2xl"
            aria-hidden="true"
          />
          Filters
        </span>
        <FaChevronDown
          aria-hidden="true"
          className={`text-base transition-transform duration-300 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </Button>

      <div
        id="collection-filter-options"
        inert={!isExpanded}
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-500 border-t border-gray-200 px-4 pb-4 opacity-100 sm:px-6 sm:pb-5" : "max-h-0 opacity-0"}`}
      >
        <div className="grid gap-4 py-4 sm:grid-cols-2 sm:gap-6 sm:py-6 xl:grid-cols-[minmax(250px,0.85fr)_minmax(440px,1.7fr)_minmax(260px,0.9fr)_minmax(300px,1.1fr)]">
          <fieldset>
            <legend className="mb-2 font-poppins text-base font-semibold text-primary sm:mb-3 sm:text-lg">
              Release year
            </legend>
            <div className="grid grid-cols-2 gap-x-3">
              <label className="font-inter text-sm text-primary">
                <span className="mb-1 block sm:mb-1.5">From</span>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 sm:py-2.5"
                  {...register("fromYear", {
                    min: { value: 1900, message: "Year can't be before 1900" },
                    max: {
                      value: watch("toYear"),
                      message: `Can't be after ${watch("toYear")}`,
                    },
                  })}
                />
              </label>
              <label className="font-inter text-sm text-primary">
                <span className="mb-1 block sm:mb-1.5">To</span>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 sm:py-2.5"
                  {...register("toYear", {
                    max: { value: 2100, message: "Year can't be after 2100" },
                    min: {
                      value: watch("fromYear"),
                      message: `Can't be before ${watch("fromYear")}`,
                    },
                  })}
                />
              </label>
              <p className="min-h-5 text-sm text-red-500">
                {errors.fromYear?.message}
              </p>

              <p className="min-h-5 text-sm text-red-500">
                {errors.toYear?.message}
              </p>
            </div>
          </fieldset>

          <FilterRadioGroup
            section={USER_MOVIE_FILTERS.sortBy}
            name="collection-sort-by"
            register={{ ...register("sortBy") }}
          />
          <FilterRadioGroup
            section={USER_MOVIE_FILTERS.order}
            name="collection-order"
            register={{ ...register("order") }}
          />
          {showLikedFilter && (
            <FilterRadioGroup
              section={USER_MOVIE_FILTERS.liked}
              name="collection-liked"
              register={{ ...register("liked") }}
            />
          )}
        </div>

        <div className="border-t border-gray-200 py-4 sm:py-5">
          <div className="mb-2 flex items-end justify-between gap-4 sm:mb-3">
            <h2 className="font-poppins text-base font-semibold text-primary sm:text-lg">
              Genres
            </h2>
            <p className="font-inter text-sm text-secondary">
              {selectedGenresIds.size} of {filterGenres.length} selected
            </p>
          </div>
          <div
            id="collection-genre-options"
            className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10"
          >
            {filterGenres.map((genre, index) => (
              <GenreChip
                key={genre.id}
                className={
                  areAllGenresShown ? "" : getCollapsedGenreClass(index)
                }
                isSelected={selectedGenresIds.has(genre.id) ? true : false}
                onClick={() => toggleGenres(genre.id)}
              >
                {genre.name}
              </GenreChip>
            ))}
          </div>
          <Button
            type="button"
            aria-expanded={areAllGenresShown}
            aria-controls="collection-genre-options"
            onClick={() => setAreAllGenresShown((shown) => !shown)}
            className="mt-3 font-inter text-sm font-medium text-accent underline-offset-4 hover:underline xl:hidden"
          >
            {areAllGenresShown
              ? "Show fewer genres"
              : `Show all ${filterGenres.length} genres`}
          </Button>
        </div>

        <div className="flex gap-3 border-t border-gray-200 pt-4 sm:justify-end">
          <Button
            type="button"
            className="w-1/2 border border-accent bg-white px-4 py-2.5 text-sm text-accent hover:bg-amber-50 sm:w-auto"
          >
            Clear filters
          </Button>
          <Button
            type="button"
            className="w-1/2 bg-accent px-4 py-2.5 text-sm text-white shadow-sm hover:bg-[#bd8f16] sm:w-auto"
            onClick={handleSubmit((data) => {
              setIsExpanded(false);
              toast.success("filter applied");
              window.scrollTo(0, 0);
              addFilters(data);
            })}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CollectionFilters;

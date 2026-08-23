import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { LuSlidersHorizontal } from "react-icons/lu";
import {
  USER_MOVIE_FILTER_GENRES,
  USER_MOVIE_FILTERS,
} from "../userMovieFilters";
import Button from "../../../components/ui/Button";
import FilterRadioGroup from "./FilterRadioGroup";
import GenreChip from "./GenreChip";

const CollectionFilters = ({ status }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const showLikedFilter = status === "watched";

  return (
    <section className="mb-10 overflow-hidden rounded-2xl border border-gray-200 border-l-4 border-l-accent bg-white shadow-sm">
      <Button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="collection-filter-options"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        className="flex w-full items-center justify-between rounded-none px-4 py-5 text-left text-primary hover:bg-amber-50/60 sm:px-6"
      >
        <span className="flex items-center gap-3 text-lg sm:text-xl">
          <LuSlidersHorizontal
            className="text-2xl text-primary"
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

      {isExpanded && (
        <div
          id="collection-filter-options"
          className="border-t border-gray-200 px-4 pb-4 sm:px-6 sm:pb-5"
        >
          <div className="grid gap-6 py-6 md:grid-cols-2 xl:grid-cols-[minmax(250px,0.85fr)_minmax(440px,1.7fr)_minmax(260px,0.9fr)_minmax(300px,1.1fr)]">
            <fieldset>
              <legend className="mb-3 font-poppins text-lg font-semibold text-primary">
                Release year
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <label className="font-inter text-sm text-primary">
                  <span className="mb-1.5 block">From</span>
                  <input
                    type="number"
                    min="1900"
                    max="2100"
                    defaultValue="1900"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>
                <label className="font-inter text-sm text-primary">
                  <span className="mb-1.5 block">To</span>
                  <input
                    type="number"
                    min="1900"
                    max="2100"
                    defaultValue="2100"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>
              </div>
            </fieldset>

            <FilterRadioGroup
              section={USER_MOVIE_FILTERS.sortBy}
              name="collection-sort-by"
            />
            <FilterRadioGroup
              section={USER_MOVIE_FILTERS.order}
              name="collection-order"
            />
            {showLikedFilter && (
              <FilterRadioGroup
                section={USER_MOVIE_FILTERS.liked}
                name="collection-liked"
              />
            )}
          </div>

          <div className="border-t border-gray-200 py-5">
            <div className="mb-3 flex items-end justify-between gap-4">
              <h2 className="font-poppins text-lg font-semibold text-primary">
                Genres
              </h2>
              <p className="font-inter text-sm text-secondary">
                0 of 19 selected
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10">
              {USER_MOVIE_FILTER_GENRES.map((genre) => (
                <GenreChip key={genre.id}>{genre.name}</GenreChip>
              ))}
            </div>
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
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CollectionFilters;

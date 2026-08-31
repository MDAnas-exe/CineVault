import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiChevronDown, HiOutlineCalendarDays } from "react-icons/hi2";
import { LuSlidersHorizontal } from "react-icons/lu";
import toast from "react-hot-toast";
import { DEFAULT_REVIEW_FILTERS } from "../userReviewFilters";
import FilterActionButtons from "../../../components/ui/FilterActionButtons";
import Button from "../../../components/ui/Button";

const fieldClassName =
  "h-11 w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3.5 font-inter text-sm text-primary placeholder:text-secondary transition-colors duration-200 enabled:hover:border-accent/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:text-sm lg:h-10.5";
const labelClassName =
  "mb-1.5 block font-inter text-xs font-medium text-primary sm:text-sm";
const optionClassName = "bg-white py-2 font-inter text-sm text-primary";

const ReviewFilters = () => {
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { fromDate, toDate, sortBy, order } = Object.fromEntries(searchParams);

  const { register, handleSubmit, setValues } = useForm({
    defaultValues: {
      fromDate: fromDate || DEFAULT_REVIEW_FILTERS.fromDate,
      toDate: toDate || DEFAULT_REVIEW_FILTERS.toDate,
      sortBy: sortBy || DEFAULT_REVIEW_FILTERS.sortBy,
      order: order || DEFAULT_REVIEW_FILTERS.order,
    },
  });

  function applyFilters(data) {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value && value !== DEFAULT_REVIEW_FILTERS[key]) {
        params.set(key, value);
      }
    });
    navigate(
      window.location.pathname +
        (params.toString() ? "?" + params.toString() : ""),
    );
    setIsExpanded(false);
    toast.success("filter applied");
  }

  function clearFilters() {
    setIsExpanded(false);
    setValues({ ...DEFAULT_REVIEW_FILTERS });
    setSearchParams({});
  }

  return (
    <form
      onSubmit={handleSubmit(applyFilters)}
      aria-labelledby={`${id}-title`}
      className="mb-6 overflow-hidden rounded-2xl border border-neutral-200 border-l-4 border-l-accent bg-white shadow-sm md:mb-8 lg:rounded-xl"
    >
      <Button
        id={`${id}-title`}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`${id}-options`}
        onClick={() => setIsExpanded((expanded) => !expanded)}
        className={`flex w-full items-center justify-between px-4 py-4 text-left text-primary hover:bg-amber-50/60 sm:px-5 sm:py-5 ${
          isExpanded ? "border-b border-neutral-200" : ""
        }`}
      >
        <span className="flex items-center gap-3 font-poppins text-base font-semibold sm:text-lg">
          <LuSlidersHorizontal
            className="text-xl text-primary sm:text-2xl"
            aria-hidden="true"
          />
          Filter reviews
        </span>
        <HiChevronDown
          aria-hidden="true"
          className={`size-5 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </Button>
      <div
        id={`${id}-options`}
        inert={!isExpanded}
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded
            ? "max-h-150 px-4 pb-4 opacity-100 sm:px-5 sm:pb-5"
            : "max-h-0 opacity-0"
        }`}
      >
        <fieldset className="grid min-w-0 grid-cols-1 gap-4 pt-4 sm:gap-5 sm:pt-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end lg:gap-x-4 xl:gap-x-6">
          <legend className="sr-only">Review filters</legend>
          <div className="min-w-0">
            <label htmlFor={`${id}-from`} className={labelClassName}>
              From date
            </label>
            <div className="relative">
              <HiOutlineCalendarDays
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-secondary"
                aria-hidden="true"
              />
              <input
                id={`${id}-from`}
                type="date"
                className={`${fieldClassName} pl-10`}
                {...register("fromDate")}
              />
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor={`${id}-to`} className={labelClassName}>
              To date
            </label>
            <div className="relative">
              <HiOutlineCalendarDays
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-secondary"
                aria-hidden="true"
              />
              <input
                id={`${id}-to`}
                type="date"
                className={`${fieldClassName} pl-10`}
                {...register("toDate")}
              />
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor={`${id}-sort`} className={labelClassName}>
              Sort by
            </label>
            <div className="relative">
              <select
                id={`${id}-sort`}
                className={`${fieldClassName} appearance-none pr-10`}
                {...register("sortBy")}
              >
                <option value="createdAt" className={optionClassName}>
                  Date written
                </option>
                <option value="updatedAt" className={optionClassName}>
                  Date updated
                </option>
              </select>
              <HiChevronDown
                className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-primary"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor={`${id}-order`} className={labelClassName}>
              Order
            </label>
            <div className="relative">
              <select
                id={`${id}-order`}
                className={`${fieldClassName} appearance-none pr-10`}
                {...register("order")}
              >
                <option value="desc" className={optionClassName}>
                  Newest first
                </option>
                <option value="asc" className={optionClassName}>
                  Oldest first
                </option>
              </select>
              <HiChevronDown
                className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-primary"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3 md:col-span-2 md:mt-1 md:flex md:justify-between lg:col-span-1 lg:mt-0 lg:flex lg:items-end lg:gap-3 xl:gap-4">
            <FilterActionButtons onClear={clearFilters} />
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default ReviewFilters;

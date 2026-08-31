import { useId } from "react";
import { HiChevronDown, HiOutlineCalendarDays } from "react-icons/hi2";
import Button from "../../../components/ui/Button";

const fieldClassName = "h-12 w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-4 font-inter text-base text-primary placeholder:text-secondary transition-colors duration-200 enabled:hover:border-accent/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-100 sm:h-16 sm:text-[22px] lg:h-13 lg:text-base xl:h-12 xl:text-sm";
const labelClassName = "mb-2 block font-inter text-sm font-medium text-primary sm:text-xl lg:text-base xl:text-sm";

const ReviewFilters = ({ register, onSubmit, onClear, disabled = false }) => {
  const id = useId();

  return (
    <form onSubmit={onSubmit} aria-labelledby={`${id}-title`} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 lg:rounded-xl lg:p-7 xl:rounded-lg xl:p-5">
      <h2 id={`${id}-title`} className="mb-5 font-poppins text-lg font-semibold text-primary sm:text-2xl xl:text-xl">
        Filter reviews
      </h2>
      <fieldset disabled={disabled} className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-x-7 lg:gap-y-6 xl:grid-cols-[repeat(4,minmax(0,1fr))_auto] xl:items-end xl:gap-x-8">
        <legend className="sr-only">Review filters</legend>
        <div className="min-w-0">
          <label htmlFor={`${id}-from`} className={labelClassName}>From date</label>
          <div className="relative">
            <HiOutlineCalendarDays className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-secondary sm:size-6 lg:size-5" aria-hidden="true" />
            <input
              id={`${id}-from`}
              type={disabled ? "text" : "date"}
              name="fromDate"
              placeholder="Select date"
              className={`${fieldClassName} pl-11 sm:pl-12 lg:pl-11`}
              {...register?.("fromDate")}
            />
          </div>
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-to`} className={labelClassName}>To date</label>
          <div className="relative">
            <HiOutlineCalendarDays className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-secondary sm:size-6 lg:size-5" aria-hidden="true" />
            <input
              id={`${id}-to`}
              type={disabled ? "text" : "date"}
              name="toDate"
              placeholder="Select date"
              className={`${fieldClassName} pl-11 sm:pl-12 lg:pl-11`}
              {...register?.("toDate")}
            />
          </div>
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-sort`} className={labelClassName}>Sort by</label>
          <div className="relative">
            <select id={`${id}-sort`} name="sortBy" defaultValue="createdAt" className={`${fieldClassName} appearance-none pr-11`} {...register?.("sortBy")}>
              <option value="createdAt">Date written</option>
              <option value="updatedAt">Date updated</option>
            </select>
            <HiChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-primary sm:size-5 xl:size-4" aria-hidden="true" />
          </div>
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-order`} className={labelClassName}>Order</label>
          <div className="relative">
            <select id={`${id}-order`} name="order" defaultValue="desc" className={`${fieldClassName} appearance-none pr-11`} {...register?.("order")}>
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
            <HiChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-primary sm:size-5 xl:size-4" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-2 lg:mt-1 lg:flex lg:justify-between xl:col-span-1 xl:mt-0 xl:ml-8 xl:gap-4">
          <Button
            type="button"
            onClick={onClear}
            className="min-h-12 rounded-lg border border-accent bg-white px-2 py-2 font-inter text-sm font-medium text-accent enabled:hover:bg-accent/5 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:active:scale-100 sm:min-h-16 sm:px-5 sm:text-[22px] lg:min-h-13 lg:px-7 lg:text-lg xl:min-h-11 xl:border-neutral-300 xl:px-4 xl:text-sm xl:text-primary xl:enabled:hover:bg-neutral-50"
          >
            Clear filters
          </Button>
          <Button
            type="submit"
            className="min-h-12 rounded-lg bg-accent px-2 py-2 font-inter text-sm font-medium text-white hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-accent disabled:active:scale-100 sm:min-h-16 sm:px-5 sm:text-[22px] lg:min-h-13 lg:min-w-50 lg:px-7 lg:text-lg xl:min-h-11 xl:min-w-0 xl:px-4 xl:text-sm"
          >
            Apply filters
          </Button>
        </div>
      </fieldset>
    </form>
  );
};

export default ReviewFilters;

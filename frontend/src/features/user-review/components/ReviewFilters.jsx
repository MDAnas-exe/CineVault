import { useId } from "react";
import { HiChevronDown } from "react-icons/hi2";
import Button from "../../../components/ui/Button";

const fieldClassName = "h-11 w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 font-inter text-sm text-primary transition-colors duration-200 hover:border-accent/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-secondary";

const ReviewFilters = ({ register, onSubmit, onClear, disabled = false }) => {
  const id = useId();

  return (
    <form onSubmit={onSubmit} aria-labelledby={`${id}-title`} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm md:p-6">
      <h2 id={`${id}-title`} className="mb-5 font-poppins text-base font-semibold text-primary md:text-lg">Filter reviews</h2>
      <fieldset disabled={disabled} className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-5 xl:grid-cols-[repeat(4,minmax(0,1fr))_auto] xl:items-end">
        <legend className="sr-only">Review filters</legend>
        <div className="min-w-0">
          <label htmlFor={`${id}-from`} className="mb-2 block font-inter text-sm font-medium text-primary">From date</label>
          <input id={`${id}-from`} type="date" name="fromDate" className={fieldClassName} {...register?.("fromDate")} />
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-to`} className="mb-2 block font-inter text-sm font-medium text-primary">To date</label>
          <input id={`${id}-to`} type="date" name="toDate" className={fieldClassName} {...register?.("toDate")} />
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-sort`} className="mb-2 block font-inter text-sm font-medium text-primary">Sort by</label>
          <div className="relative">
            <select id={`${id}-sort`} name="sortBy" defaultValue="createdAt" className={`${fieldClassName} appearance-none pr-9`} {...register?.("sortBy")}>
              <option value="createdAt">Date written</option>
              <option value="updatedAt">Date updated</option>
            </select>
            <HiChevronDown className="pointer-events-none absolute top-3.5 right-3 size-4 text-secondary" aria-hidden="true" />
          </div>
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-order`} className="mb-2 block font-inter text-sm font-medium text-primary">Order</label>
          <div className="relative">
            <select id={`${id}-order`} name="order" defaultValue="desc" className={`${fieldClassName} appearance-none pr-9`} {...register?.("order")}>
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
            <HiChevronDown className="pointer-events-none absolute top-3.5 right-3 size-4 text-secondary" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-3 md:col-span-2 md:flex md:justify-between xl:col-span-1 xl:mt-0 xl:gap-3">
          <Button type="button" onClick={onClear} className="min-h-11 rounded-lg border border-accent px-3 py-2 font-inter text-sm font-medium text-accent hover:bg-accent/5 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 md:px-5 xl:border-neutral-300 xl:text-primary xl:hover:bg-neutral-50">Clear filters</Button>
          <Button type="submit" className="min-h-11 rounded-lg bg-accent px-3 py-2 font-inter text-sm font-medium text-white hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 md:px-5">Apply filters</Button>
        </div>
      </fieldset>
    </form>
  );
};

export default ReviewFilters;

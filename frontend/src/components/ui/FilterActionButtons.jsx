import Button from "./Button";

const FilterActionButtons = ({ onClear, onApply }) => {
  return (
    <>
      <Button
        type="button"
        onClick={onClear}
        className="w-1/2 border border-accent bg-white px-4 py-2.5 font-inter text-sm font-medium text-accent hover:bg-accent/5 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 sm:w-auto"
      >
        Clear filters
      </Button>
      <Button
        type={onApply ? "button" : "submit"}
        onClick={onApply}
        className="w-1/2 bg-accent px-4 py-2.5 font-inter text-sm font-medium text-white hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 sm:w-auto"
      >
        Apply filters
      </Button>
    </>
  );
};

export default FilterActionButtons;

const FilterRadioGroup = ({ section, name, className = "" }) => {
  return (
    <fieldset className={className}>
      <legend className="mb-3 font-poppins text-lg font-semibold text-primary">
        {section.title}
      </legend>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 xl:grid-cols-4">
        {section.options.map(({ label, value, isDefault }) => {
          const id = `${name}-${value}`;

          return (
            <label
              key={value}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2 whitespace-nowrap font-inter text-sm text-primary transition-colors duration-200 hover:text-accent sm:text-base"
            >
              <input
                id={id}
                name={name}
                value={value}
                type="radio"
                defaultChecked={isDefault}
                className="appearance-none w-4.5 h-4.5 rounded-full border-2 border-gray-300 checked:border-accent checked:bg-accent checked:shadow-[inset_0_0_0_3px_white] cursor-pointer"
              />
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default FilterRadioGroup;

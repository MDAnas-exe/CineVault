const FilterRadioGroup = ({ section, name, className = "", register }) => {
  return (
    <fieldset className={className}>
      <legend className="mb-2 font-poppins text-base font-semibold text-primary sm:mb-3 sm:text-lg">
        {section.title}
      </legend>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-x-5 sm:gap-y-3 xl:grid-cols-4">
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
                className="appearance-none w-4.5 h-4.5 rounded-full border-2 border-gray-300 checked:border-accent checked:bg-accent checked:shadow-[inset_0_0_0_3px_white] cursor-pointer hover:border-accent transition-colors duration-200"
                {...register}
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

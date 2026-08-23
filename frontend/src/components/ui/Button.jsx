import { twMerge } from "tailwind-merge";

const Button = ({ children, className = "", ...rest }) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "cursor-pointer rounded-xl font-poppins font-semibold transition-all duration-200 focus:outline-none  active:scale-[0.99]",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;

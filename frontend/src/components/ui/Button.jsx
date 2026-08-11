import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  type,
  className = "",
  isPending = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      type={type}
      className={twMerge(
        "h-12 w-full cursor-pointer rounded-xl bg-accent font-poppins font-semibold text-primary shadow-sm transition-all duration-200 hover:bg-[#c89412] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 active:scale-[0.99]",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;

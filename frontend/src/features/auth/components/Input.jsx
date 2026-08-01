import { useRef } from "react";

const Input = ({ type = "text", label, placeholder, icon: Icon, register }) => {
  const localRef = useRef(null);
  const { ref: rhfRef, ...rest } = register;

  return (
    <div>
      <label className="mb-1 block font-medium text-primary">{label}</label>
      <div
        className="flex h-12 items-center rounded-xl border border-gray-300 bg-white px-4 transition-colors duration-200 hover:border-gray-400 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20"
        onClick={() => localRef.current.focus()}
      >
        <Icon className="mr-3 text-gray-500" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-primary placeholder:text-gray-400 focus:outline-none"
          {...rest}
          ref={(el) => {
            rhfRef(el);
            localRef.current = el;
          }}
        />
      </div>
    </div>
  );
};

export default Input;

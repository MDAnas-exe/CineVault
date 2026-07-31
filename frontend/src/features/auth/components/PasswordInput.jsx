import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const PasswordInput = ({ label, placeholder, icon: Icon, register }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { ref: rhfRef, ...rest } = register;
  const localRef = useRef(null);

  return (
    <div onClick={() => localRef.current.focus()}>
      <label className="mb-2 block font-medium text-primary">{label}</label>

      <div className="flex h-12 items-center rounded-xl border border-gray-300 bg-white px-4 transition-colors duration-200 hover:border-gray-400 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
        <Icon className="mr-3 text-gray-500" />

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full bg-transparent text-primary placeholder:text-gray-400 focus:outline-none"
          {...register}
          ref={(el) => {
            rhfRef(el);
            localRef.current = el;
          }}
        />
        <span
          className="cursor-pointer"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
  );
};
export default PasswordInput;

import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";
const ThemeToggle = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className={`relative size-10 flex items-center justify-center hover:bg-gray-400 duration-200 rounded-full cursor-pointer`}
    >
      <FaSun
        className={`absolute inset-0 m-auto transition-opacity duration-300 text-yellow-500 ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      />
      <FaMoon
        className={`absolute inset-0 m-auto transition-opacity duration-300 text-blue-400 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;

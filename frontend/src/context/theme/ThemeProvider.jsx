import { useEffect, useState } from "react";
import { themeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const value = { isDark, setIsDark };

  return (
    <themeContext.Provider value={value}> {children}</themeContext.Provider>
  );
};
export default ThemeProvider;

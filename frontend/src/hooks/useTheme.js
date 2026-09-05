import { useContext } from "react";
import { themeContext } from "../context/theme/ThemeContext.js";

export default function useTheme() {
  return useContext(themeContext);
}

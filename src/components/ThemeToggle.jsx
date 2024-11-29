import React from "react";
import { useTheme } from "../context/ThemeContext";
import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Classic
      duration={750}
      toggled={isDark}
      toggle={toggleTheme}
      className="cursor-pointer text-3xl"
    />
  );
};

export default ThemeToggle;

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle({ type }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="w-full flex justify-center items-center"
      aria-label="Toggle theme"
    >
      {type === "icon" ? (
        theme === "light" ? (
          <Moon size={20} />
        ) : (
          <Sun size={20} />
        )
      ) : (
        <Button className="btn-solid">
          {theme === "light" ? "Switch Dark Mode" : "Switch Light  Mode"}
        </Button>
      )}
    </div>
  );
}

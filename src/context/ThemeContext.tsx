"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAppSounds } from "../hooks/useAppSounds";

type Theme = "dark" | "iris" | "matrix" | "pepe";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const { playThemeSwitch } = useAppSounds();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("caelumTheme") as Theme | null;
      const validThemes: Theme[] = ["dark", "iris", "matrix", "pepe"];
      const initial = saved && validThemes.includes(saved) ? saved : "dark";
      setThemeState(initial);
      // DON'T set document.documentElement.className!
    } catch {
      // nothing needed
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    playThemeSwitch();
  }, [theme, playThemeSwitch]);

  const setTheme = (newTheme: Theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("caelumTheme", newTheme);
      // DON'T set document.documentElement.className!
    }
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const THEME_KEY = "course-organizer-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
      applyThemeClass(stored);
      return;
    }

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = systemDark ? "dark" : "light";
    setThemeState(initial);
    applyThemeClass(initial);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    applyThemeClass(next);
    window.localStorage.setItem(THEME_KEY, next);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve essere usato dentro ThemeProvider");
  }
  return context;
}

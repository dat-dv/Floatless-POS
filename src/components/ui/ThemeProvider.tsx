"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { ETheme } from "@/types/theme.type";
import { ThemeTransition } from "./ThemeTransition";

export const ThemeContext = createContext<{
  theme: ETheme | null;
}>({
  theme: null,
});

export const ThemeHandlerContext = createContext({
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ETheme | null>(null);
  const [showTrans, setShowTrans] = useState(true);

  const syncTheme = useEffectEvent(() => {
    const stored = localStorage.getItem("theme") as ETheme;
    const deviceMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? ETheme.DARK
      : ETheme.LIGHT;
    const theme = stored || deviceMode;
    document.documentElement.classList.toggle("dark", theme === ETheme.DARK);
    localStorage.setItem("theme", theme);
    setTheme(theme);
    setTimeout(() => {
      setShowTrans(false);
    }, 500);
  });

  useEffect(() => {
    syncTheme();
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK;
      document.documentElement.classList.toggle("dark", next === ETheme.DARK);
      localStorage.setItem("theme", next);
      return next;
    });
    setShowTrans(true);
    setTimeout(() => {
      setShowTrans(false);
    }, 500);
  }, []);

  return (
    <ThemeHandlerContext.Provider value={{ toggleTheme: handleToggleTheme }}>
      <ThemeContext.Provider value={{ theme }}>
        {children}
        {showTrans && <ThemeTransition />}
      </ThemeContext.Provider>
    </ThemeHandlerContext.Provider>
  );
};

export default ThemeProvider;

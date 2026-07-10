import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";
type FontSize = "sm" | "md" | "lg" | "xl";

const FONT_PX: Record<FontSize, string> = {
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
};

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
  cycleFontSize: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

// Read theme synchronously from localStorage on first render.
// This matches what the blocking <script> in __root.tsx already set on <html>,
// so React hydration sees the same value and zero re-render flash occurs.
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("pssf-theme") as Theme) || "light";
}

function getInitialFontSize(): FontSize {
  if (typeof window === "undefined") return "md";
  return (localStorage.getItem("pssf-font") as FontSize) || "md";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [fontSize, setFontSizeState] = useState<FontSize>(getInitialFontSize);

  // Keep <html> class in sync whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    root.style.colorScheme = theme;
    localStorage.setItem("pssf-theme", theme);
  }, [theme]);

  // Keep CSS font-size variable in sync
  useEffect(() => {
    document.documentElement.style.setProperty("--app-font-size", FONT_PX[fontSize]);
    localStorage.setItem("pssf-font", fontSize);
  }, [fontSize]);

  const value: Ctx = {
    theme,
    setTheme: setThemeState,
    toggleTheme: () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    fontSize,
    setFontSize: setFontSizeState,
    cycleFontSize: () =>
      setFontSizeState((s) => {
        const order: FontSize[] = ["sm", "md", "lg", "xl"];
        return order[(order.indexOf(s) + 1) % order.length];
      }),
  };

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

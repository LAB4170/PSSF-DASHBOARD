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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [fontSize, setFontSizeState] = useState<FontSize>("md");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = (localStorage.getItem("pssf-theme") as Theme) || "dark";
    const f = (localStorage.getItem("pssf-font") as FontSize) || "md";
    setThemeState(t);
    setFontSizeState(f);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    root.style.colorScheme = theme;
    localStorage.setItem("pssf-theme", theme);
  }, [theme]);

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

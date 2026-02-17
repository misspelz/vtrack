// stores/themeStore.ts
import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  setDark: (dark: boolean) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  // Read persisted theme from localStorage (or fallback to prefers-color-scheme)
  const storedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  const prefersDark = typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;
  const initialIsDark = storedTheme ? storedTheme === "dark" : prefersDark;

  // Apply the initial theme to <html>
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", initialIsDark ? "dark" : "light");
  }

  return {
    isDark: initialIsDark,
    setDark: (dark) => {
      set({ isDark: dark });
      if (typeof window !== "undefined") {
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
        localStorage.setItem("theme", dark ? "dark" : "light");
      }
    },
    toggle: () => set((state) => {
      const newTheme = !state.isDark;
      if (typeof window !== "undefined") {
        document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      }
      return { isDark: newTheme };
    }),
  };
});

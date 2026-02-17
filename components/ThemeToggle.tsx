"use client";

import { useThemeStore } from "@/store/themeStore";
import * as Toggle from "@radix-ui/react-toggle";
import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { isDark, setDark, toggle } = useThemeStore();

  useEffect(() => {
    // Initialize theme from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setDark(storedTheme === "dark");
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
  }, [setDark]);

  return (
    <Toggle.Root
      pressed={isDark}
      onPressedChange={toggle}
      className={`
        flex items-center justify-center w-12 h-12 rounded-full border
        transition-colors duration-300 cursor-pointer
        ${isDark ? "bg-gray-800 border-gray-600" : "bg-blue-50 border-blue-200"}
      `}
    >
      {isDark ? <Sun className="text-white" size={20} /> : <Moon className="text-blue-800" size={20} />}
    </Toggle.Root>
  );
}

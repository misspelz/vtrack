"use client";

import ThemeToggle from "@/components/ThemeToggle";
import VoiceTracker from "@/components/VoiceTracker";
import { useThemeStore } from "@/store/themeStore";
import { lightColors, darkColors } from "@/lib/themeColors";

export default function Home() {
  const { isDark } = useThemeStore();
  const colors = isDark ? darkColors : lightColors;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-8 p-6 transition-colors duration-300 relative">
      {/* Header */}
      <header
        className={`flex w-full max-w-4xl justify-between items-center sticky top-0 z-50 
                    backdrop-blur-md px-4 py-4 md:px-6 md:py-6 shadow-sm transition-colors duration-300
                    ${isDark ? "bg-zinc-900/70" : "bg-white/70"}`}
      >
        <h1 className={`text-4xl font-bold logo-font ${colors.header}`}>
          VTrack
        </h1>
        <ThemeToggle />
      </header>

      <main className="flex flex-col items-center w-full max-w-2xl gap-6 mt-4">
        {/* Intro text */}
        <div className="text-center">

          <p className={`text-sm opacity-80`}>
            Track your speaking sessions, measure your words per minute (WPM),
            and see how much time you actually spend talking. Start recording
            and watch your speaking stats in real time!
          </p>
        </div>

        <VoiceTracker />
      </main>
    </div>
  );
}

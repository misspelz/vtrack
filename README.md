# VTrack – Voice Performance Monitor

A lightweight real-time voice tracker built with Next.js 16, React 19, and Tailwind v4. Inspired by *Talk Like TED*, VTrack helps you monitor your speaking pace, active time, and transcript during practice sessions.

---

## Features

- **Live WPM** — measures your speaking speed in real time with zone feedback: Too Slow (< 100), Ideal (100–160), Too Fast (> 160)
- **VU Meter** — visualizes your microphone input using the Web Audio API with color-coded frequency bars
- **Active vs Total Time** — tracks how long you've been speaking versus total session duration
- **Live Transcript** — streams your spoken words as text using the Web Speech API, with copy and clear actions
- **Light / Dark Mode** — toggles cleanly via class-based Tailwind v4 theming
- **Reset Session** — clears all state and stops all audio streams in one click

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| State | React hooks + Zustand (available) |
| Audio | Web Audio API (`AnalyserNode`) |
| Speech | Web Speech API (`SpeechRecognition`) |

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout, sets initial dark class on <html>
│   ├── page.tsx            # Main VTrack page, theme toggle logic
│   └── globals.css         # Tailwind v4 config, @custom-variant dark, fonts
├── components/
│   ├── StatCard.tsx        # WPM / active time / word count display cards
│   ├── VUMeter.tsx         # Real-time audio frequency bar visualizer
│   ├── SessionTimeline.tsx # Progress bar showing session duration + active ratio
│   ├── TranscriptPanel.tsx # Scrolling live transcript with copy/clear
│   └── RecordingControls.tsx # Start / Stop / Reset buttons
├── hooks/
│   └── useVTrack.ts        # All recording logic: audio, speech, timers, VU
├── lib/
│   └── utils.ts            # formatTime, getWpmZone, countWords
└── types/
    ├── vtrack.ts           # Shared TypeScript interfaces
    └── speech-recognition.d.ts  # Ambient types for Web Speech API
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in **Chrome or Edge** — the Web Speech API is not supported in Firefox or Safari.

---

## Browser Support

| Browser | Supported |
|---|---|
| Chrome | ✅ |
| Edge | ✅ |
| Firefox | ❌ No Web Speech API |
| Safari | ❌ No Web Speech API |

---

## Notes

- Microphone permission is required on first use
- WPM is calculated from session start — give it a few seconds to stabilize
- Dark mode uses `@custom-variant dark (&:where(.dark, .dark *))` — the correct Tailwind v4 syntax for class-based theming
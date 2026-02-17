"use client";

import { useState, useEffect, useRef } from "react";
import * as Separator from "@radix-ui/react-separator";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Mic, StopCircle, RotateCcw, Copy } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { darkColors, lightColors } from "@/lib/themeColors";
import { calculateWPM, formatTime } from "@/utils";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export default function VoiceTracker() {
  const { isDark } = useThemeStore();
  const colors = isDark ? darkColors : lightColors;

  const [isRecording, setIsRecording] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const recognitionRef = useSpeechRecognition((text, words) => {
    setTranscript(text);
    setWordCount(words);
  });

  const fullTranscriptRef = useRef("");
  const lastWordCountRef = useRef(0);

  const wpm = calculateWPM(wordCount, seconds);

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setTotalSeconds((s) => s + 1);
        if (wordCount > lastWordCountRef.current) {
          setSeconds((s) => s + 1);
          lastWordCountRef.current = wordCount;
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, wordCount]);

  const toggleRecording = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return alert("Speech recognition not supported.");
    isRecording ? recognition.stop() : recognition.start();
    setIsRecording(!isRecording);
  };

  const resetSession = () => {
    setIsResetting(true);
    recognitionRef.current?.stop();
    fullTranscriptRef.current = "";
    setTranscript("");
    setWordCount(0);
    setSeconds(0);
    setTotalSeconds(0);
    lastWordCountRef.current = 0;
    setIsRecording(false);
    setTimeout(() => setIsResetting(false), 1000);
  };

  const copyTranscript = async () => {
    if (!transcript) return;
    await navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`w-full max-w-lg mx-auto flex flex-col justify-center items-center px-4 py-8 md:p-8 rounded-2xl shadow-xl ${colors.bg} ${colors.border} border`}
    >
      <h2
        className={`text-2xl font-semibold text-center mb-2 ${colors.header}`}
      >
        Voice Tracker
      </h2>

      {/* Timer */}
      <div className="flex justify-center gap-4 mb-4 text-sm opacity-80">
        <span>Active: {formatTime(seconds)}</span>
        <span>{wpm} WPM</span>
        <span>Total: {formatTime(totalSeconds)}</span>
      </div>

      <Separator.Root
        className={`h-px mb-6 ${isDark ? "bg-zinc-700" : "bg-blue-200"}`}
      />

      {/* Word count */}
      <div className="text-center mb-6">
        <p className={`text-sm mb-1 ${colors.secondaryText}`}>Words spoken</p>
        <p className={`text-4xl font-bold ${colors.text}`}>{wordCount}</p>
      </div>

      {/* Record button */}
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              onClick={toggleRecording}
              className={`w-full md:w-100 flex items-center justify-center gap-2 py-3 rounded-full font-semibold shadow-md transition cursor-pointer ${
                isRecording
                  ? "bg-red-500 text-white! animate-pulse"
                  : "bg-(--color-accent) text-white!"
              }`}
            >
              {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content
            sideOffset={6}
            className={`px-3 py-1 rounded-md text-xs ${colors.tooltip}`}
          >
            {isRecording ? "Stop listening" : "Start voice tracking"}
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>

      {/* Reset & Copy */}
      <button
        onClick={resetSession}
        className={`mt-4 w-full md:w-100 flex items-center justify-center gap-2 py-2 rounded-full border text-sm cursor-pointer ${colors.resetHover} transition`}
      >
        <RotateCcw
          size={16}
          className={`${isResetting ? "animate-spin" : ""} transition-transform`}
        />
        Reset Session
      </button>

      <button
        onClick={copyTranscript}
        className={`mt-2 w-full md:w-100 flex items-center justify-center gap-2 py-2 rounded-full border text-sm cursor-pointer ${colors.resetHover} transition`}
      >
        <Copy size={16} className={copied ? " animate-bounce" : ""} />
        {copied ? "Copied!" : "Copy Transcript"}
      </button>

      <Separator.Root
        className={`h-px my-6 ${isDark ? "bg-zinc-700" : "bg-blue-200"}`}
      />

      {/* Transcript */}
      <div
        className={`h-32 overflow-auto rounded-xl p-4 text-sm w-full 
              transition-colors duration-300
              ${
                isDark
                  ? "bg-zinc-800 text-gray-100 border border-zinc-700"
                  : "bg-blue-100 text-blue-900 border border-blue-200"
              }`}
      >
        {transcript || (
          <span className="opacity-50">
            Start speaking… transcript shows here.
          </span>
        )}
      </div>
    </div>
  );
}

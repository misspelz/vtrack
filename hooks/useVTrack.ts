
"use client";

import { useState, useRef, useCallback } from "react";
import { countWords, getWpmZone } from "@/lib/utils";
import { WpmZone } from "@/types/vtrack";

type SpeechRecognitionCtor = new () => SpeechRecognition;

export interface VTrackState {
  isRecording: boolean;
  transcript: string;
  wordCount: number;
  totalTime: number;
  activeTime: number;
  wpm: number;
  vuLevels: number[];
  zone: WpmZone;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetSession: () => void;
  setTranscript: (t: string) => void;
}

export function useVTrack(): VTrackState {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [vuLevels, setVuLevels] = useState<number[]>(Array(32).fill(0));

  const recRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionStartRef = useRef<number | null>(null);
  const vuRafRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const animateVU = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const bars = Array(32)
      .fill(0)
      .map((_, i) => {
        const start = Math.floor((i * data.length) / 32);
        const end = Math.floor(((i + 1) * data.length) / 32);
        const slice = data.slice(start, end);
        const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
        return Math.min(100, (avg / 255) * 100);
      });
    setVuLevels(bars);
    // eslint-disable-next-line react-hooks/immutability
    vuRafRef.current = requestAnimationFrame(animateVU);
  }, []);

  const stopRecording = useCallback(() => {
    recRef.current?.stop();
    if (vuRafRef.current) cancelAnimationFrame(vuRafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close();
    if (timerRef.current) clearInterval(timerRef.current);
    if (activeTimerRef.current) clearInterval(activeTimerRef.current);
    setIsRecording(false);
    setVuLevels(Array(32).fill(0));
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioCtxRef.current = new AudioContext();
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      const src = audioCtxRef.current.createMediaStreamSource(stream);
      src.connect(analyserRef.current);
      vuRafRef.current = requestAnimationFrame(animateVU);

      // Resolve the constructor safely across Chrome and older webkit prefix
      const SR: SpeechRecognitionCtor | undefined =
        (window as Window & { SpeechRecognition?: SpeechRecognitionCtor }).SpeechRecognition ??
        (window as Window & { webkitSpeechRecognition?: SpeechRecognitionCtor }).webkitSpeechRecognition;

      if (!SR) {
        alert("Speech recognition is not supported in this browser. Try Chrome or Edge.");
        return;
      }

      const rec: SpeechRecognition = new SR();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";
      recRef.current = rec;

      sessionStartRef.current = Date.now();

      rec.onresult = (e: SpeechRecognitionEvent) => {
        let final = "";
        for (let i = 0; i < e.results.length; i++) {
          if (e.results[i].isFinal) final += e.results[i][0].transcript + " ";
        }
        setTranscript(final);
        const wc = countWords(final);
        setWordCount(wc);
        const elapsed = (Date.now() - (sessionStartRef.current ?? Date.now())) / 1000 / 60;
        if (elapsed > 0) setWpm(Math.round(wc / elapsed));
      };

      rec.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => setTotalTime((t) => t + 1), 1000);
      activeTimerRef.current = setInterval(() => setActiveTime((t) => t + 1), 1000);
    } catch {
      alert("Microphone access was denied. Please allow microphone access and try again.");
    }
  }, [animateVU]);

  const resetSession = useCallback(() => {
    stopRecording();
    setTranscript("");
    setWordCount(0);
    setTotalTime(0);
    setActiveTime(0);
    setWpm(0);
    setVuLevels(Array(32).fill(0));
  }, [stopRecording]);

  return {
    isRecording,
    transcript,
    wordCount,
    totalTime,
    activeTime,
    wpm,
    vuLevels,
    zone: getWpmZone(wpm),
    startRecording,
    stopRecording,
    resetSession,
    setTranscript,
  };
}
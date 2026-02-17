import { useEffect, useRef, useState } from "react";

export const useSpeechRecognition = (onResult: (text: string, wordCount: number) => void) => {
  const recognitionRef = useRef<any>(null);
  const fullTranscriptRef = useRef("");

  useEffect(() => {
    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window)) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let interimText = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += text + " ";
        else interimText += text + " ";
      }

      fullTranscriptRef.current += finalText;
      const combined = fullTranscriptRef.current + interimText;
      const words = combined.trim().split(/\s+/).filter(Boolean).length;

      onResult(combined, words);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  return recognitionRef;
};

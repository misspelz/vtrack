// /lib/utils.ts
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = ("0" + (seconds % 60)).slice(-2);
  return `${mins}:${secs}`;
};

export const calculateWPM = (words: number, seconds: number) =>
  seconds > 0 ? Math.round((words / seconds) * 60) : 0;

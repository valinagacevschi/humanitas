export const pad = (a, b) => `${1e15 + a}`.slice(-b);

export const hhmmss = x => {
  const secs = parseInt(x || 0, 10);
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs - hours * 3600) / 60);
  const seconds = secs - hours * 3600 - minutes * 60;
  if (hours > 0) {
    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
  }
  return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
};

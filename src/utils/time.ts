export function getElapsedTime(timestamp: string) {
  const totalSeconds = (Date.now() - parseInt(timestamp)) / 1000;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);

  if (hours !== 0) {
    return `${hours}h`;
  } else if (minutes !== 0) {
    return `${minutes}Min`;
  } else return `${seconds}S`;
}

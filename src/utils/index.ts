// Formats seconds into mm:ss format
// For example 60 seconds will be '01:00'
export default function formatDuration(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60)
  const remainingSeconds = Math.floor(durationInSeconds % 60)
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

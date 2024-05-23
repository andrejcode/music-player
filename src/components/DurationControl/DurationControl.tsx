import { ChangeEvent } from 'react'
import { formatDuration } from '@/utils'
import useSongStore from '@/store'
import './DurationControl.css'

function DurationControl() {
  const audio = useSongStore(state => state.audio)
  const currentTime = useSongStore(state => state.currentTime)
  const setCurrentTime = useSongStore(state => state.setCurrentTime)
  const duration = useSongStore(state => state.duration)

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
    const seekTime = parseInt(event.target.value)
    audio.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  return (
    <div className="duration-control">
      <span className="duration-control-left">{formatDuration(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="clickable"
      />
      <span className="duration-control-right">{formatDuration(duration)}</span>
    </div>
  )
}

export default DurationControl

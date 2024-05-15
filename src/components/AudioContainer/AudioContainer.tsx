import useSongStore from '@/store'
import { AudioRefProp } from '@/types'
import './AudioContainer.css'

function AudioContainer({ audioRef }: AudioRefProp) {
  const currentSong = useSongStore(state => state.currentSong)
  const setIsPlaying = useSongStore(state => state.setIsPlaying)
  const setCurrentTime = useSongStore(state => state.setCurrentTime)
  const setDuration = useSongStore(state => state.setDuration)

  function handleLoadedData() {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  function handleEnded() {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  function handleTimeUpdate() {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }

  return (
    <div className="audio-container">
      <audio
        ref={audioRef}
        src={`songs/${currentSong.fileName}`}
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
      />
    </div>
  )
}

export default AudioContainer

import { useCallback, useEffect } from 'react'
import { IoPause, IoPlay } from 'react-icons/io5'
import useSongStore from '@/store'
import './PlayPauseButton.css'

function PlayPauseButton() {
  const audio = useSongStore(state => state.audio)
  const isPlaying = useSongStore(state => state.isPlaying)
  const setIsPlaying = useSongStore(state => state.setIsPlaying)

  const toggleIsPlaying = useCallback(() => {
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }, [audio, isPlaying, setIsPlaying])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === ' ') {
        toggleIsPlaying()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleIsPlaying])

  return (
    <button className="play-pause-button clickable" onClick={toggleIsPlaying}>
      {isPlaying ? <IoPause color="#fff" size={20} /> : <IoPlay color="#fff" size={20} />}
    </button>
  )
}

export default PlayPauseButton

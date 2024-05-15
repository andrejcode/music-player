import { useEffect } from 'react'
import { IoPause, IoPlay } from 'react-icons/io5'
import useSongStore from '@/store'
import './PlayPauseButton.css'
import { AudioRefProp } from '@/types'

function PlayPauseButton({ audioRef }: AudioRefProp) {
  const isPlaying = useSongStore(state => state.isPlaying)
  const setIsPlaying = useSongStore(state => state.setIsPlaying)

  function toggleIsPlaying() {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

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
  })

  return (
    <button className="play-pause-button clickable" onClick={toggleIsPlaying}>
      {isPlaying ? <IoPause color="#fff" size={20} /> : <IoPlay color="#fff" size={20} />}
    </button>
  )
}

export default PlayPauseButton

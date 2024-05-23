import { useCallback, useEffect } from 'react'
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5'
import RoundButton from '../RoundButton/RoundButton'
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton'
import useSongStore from '@/store'
import songs from '@/songs'
import './AudioControlsButtons.css'

function AudioControlsButtons() {
  const setIsPlaying = useSongStore(state => state.setIsPlaying)
  const currentSong = useSongStore(state => state.currentSong)
  const changeSong = useSongStore(state => state.changeSong)
  const setCurrentTime = useSongStore(state => state.setCurrentTime)

  const playNextOrPreviousSong = useCallback(
    (isPreviousSong: boolean) => {
      let nextIndex: number
      const currentIndex = songs.findIndex(song => song.id === currentSong.id)

      if (isPreviousSong) {
        nextIndex = (currentIndex - 1 + songs.length) % songs.length
      } else {
        nextIndex = (currentIndex + 1) % songs.length
      }

      setCurrentTime(0)
      changeSong(songs[nextIndex])
      setIsPlaying(false)
    },
    [changeSong, currentSong.id, setCurrentTime, setIsPlaying],
  )

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        playNextOrPreviousSong(false)
      } else if (event.key === 'ArrowRight') {
        playNextOrPreviousSong(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [playNextOrPreviousSong])

  return (
    <div className="audio-controls-buttons">
      <RoundButton onClick={() => playNextOrPreviousSong(true)}>
        <IoPlaySkipBack size={16} />
      </RoundButton>

      <PlayPauseButton />

      <RoundButton onClick={() => playNextOrPreviousSong(false)}>
        <IoPlaySkipForward size={16} />
      </RoundButton>
    </div>
  )
}

export default AudioControlsButtons

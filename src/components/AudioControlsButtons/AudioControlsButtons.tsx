import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5'
import RoundButton from '../RoundButton/RoundButton'
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton'
import { AudioRefProp } from '@/types'
import useSongStore from '@/store'
import songs from '@/songs'
import './AudioControlsButtons.css'
import { useCallback, useEffect } from 'react'

function AudioControlsButtons({ audioRef }: AudioRefProp) {
  const setIsPlaying = useSongStore(state => state.setIsPlaying)
  const currentSong = useSongStore(state => state.currentSong)
  const changeSong = useSongStore(state => state.changeSong)

  const playNextOrPreviousSong = useCallback(
    (playNextSong: boolean) => {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id)

      let nextIndex: number
      if (playNextSong) {
        nextIndex = (currentIndex + 1) % songs.length
      } else {
        nextIndex = (currentIndex - 1 + songs.length) % songs.length
      }

      changeSong(songs[nextIndex])
      setIsPlaying(false)
    },
    [changeSong, currentSong.id, setIsPlaying],
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
      <RoundButton onClick={() => playNextOrPreviousSong(false)}>
        <IoPlaySkipBack size={16} />
      </RoundButton>

      <PlayPauseButton audioRef={audioRef} />

      <RoundButton onClick={() => playNextOrPreviousSong(true)}>
        <IoPlaySkipForward size={16} />
      </RoundButton>
    </div>
  )
}

export default AudioControlsButtons

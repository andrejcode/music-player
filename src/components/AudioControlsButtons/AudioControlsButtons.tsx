import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5'
import RoundButton from '../RoundButton/RoundButton'
import { AudioRefProp } from '@/types'
import useSongStore from '@/store'
import songs from '@/songs'
import './AudioControlsButtons.css'
import PlayPauseButton from '../PlayPauseButton/PlayPauseButton'
import { useCallback, useEffect } from 'react'

function AudioControlsButtons({ audioRef }: AudioRefProp) {
  const setIsPlaying = useSongStore(state => state.setIsPlaying)
  const currentSong = useSongStore(state => state.currentSong)
  const changeSong = useSongStore(state => state.changeSong)

  const playNextSong = useCallback(() => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songs.length
    changeSong(songs[nextIndex])
    setIsPlaying(false)
  }, [changeSong, currentSong, setIsPlaying])

  const playPreviousSong = useCallback(() => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length
    changeSong(songs[previousIndex])
    setIsPlaying(false)
  }, [changeSong, currentSong, setIsPlaying])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        playPreviousSong()
      } else if (event.key === 'ArrowRight') {
        playNextSong()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [playNextSong, playPreviousSong])

  return (
    <div className="audio-controls-buttons">
      <RoundButton onClick={playPreviousSong}>
        <IoPlaySkipBack size={16} />
      </RoundButton>

      <PlayPauseButton audioRef={audioRef} />

      <RoundButton onClick={playNextSong}>
        <IoPlaySkipForward size={16} />
      </RoundButton>
    </div>
  )
}

export default AudioControlsButtons

import { useState, useRef, useEffect } from 'react'
import { IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io'
import RoundButton from '../RoundButton/RoundButton'
import SongInfo from '../SongInfo/SongInfo'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import songs from '@/songs'
import './MusicPlayer.css'

function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(songs[0])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [currentSong])

  function playNextSong() {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songs.length
    setCurrentSong(songs[nextIndex])
  }

  function playPreviousSong() {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length
    setCurrentSong(songs[previousIndex])
  }

  return (
    <div className="music-player">
      <SongInfo />

      <div className="controls">
        <RoundButton onClick={playPreviousSong}>
          <IoIosSkipBackward size={18} />
        </RoundButton>
        <audio ref={audioRef} controls>
          <source src={`src/assets/songs/${currentSong.fileName}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <RoundButton onClick={playNextSong}>
          <IoIosSkipForward size={18} />
        </RoundButton>
      </div>

      {/* TODO: isFavorite */}
      <FavoriteButton isFavorite={false} />
    </div>
  )
}

export default MusicPlayer

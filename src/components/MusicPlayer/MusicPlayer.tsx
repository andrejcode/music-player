import { useState, useRef, useEffect, ChangeEvent } from 'react'
import {
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoPause,
  IoVolumeLow,
  IoVolumeHigh,
} from 'react-icons/io5'
import RoundButton from '../RoundButton/RoundButton'
import SongInfo from '../SongInfo/SongInfo'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import songs from '@/songs'
import './MusicPlayer.css'
import formatDuration from '@/utils'

const PATH_TO_SONG = 'src/assets/songs/'

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      setIsPlaying(false)
    }
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function handleLoadedData() {
      setDuration(audio!.duration)
    }

    function handleEnded() {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    function handleTimeUpdate() {
      setCurrentTime(audio!.currentTime)
    }

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audioRef])

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

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
    if (audioRef.current) {
      const seekTime = parseInt(event.target.value)
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  function handleVolumeChange(event: ChangeEvent<HTMLInputElement>) {
    if (audioRef.current) {
      const newVolume = parseInt(event.target.value) / 100
      audioRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  return (
    <div className="music-player">
      <div className="song-info-with-favorite-button">
        <FavoriteButton isFavorite={false} />
        <SongInfo title={currentSong.title} artist={currentSong.artist} />
      </div>

      <div className="audio-controls">
        <audio ref={audioRef} src={PATH_TO_SONG + currentSong.fileName} preload="metadata">
          Your browser does not support the audio element.
        </audio>

        <div className="audio-controls-buttons">
          <RoundButton onClick={playPreviousSong}>
            <IoPlaySkipBack size={16} />
          </RoundButton>

          <button
            className="play-pause-button clickable"
            onClick={() => {
              if (isPlaying) {
                audioRef.current?.pause()
                setIsPlaying(false)
              } else {
                audioRef.current?.play()
                setIsPlaying(true)
              }
            }}
          >
            {isPlaying ? <IoPause color="#fff" size={20} /> : <IoPlay color="#fff" size={20} />}
          </button>

          <RoundButton onClick={playNextSong}>
            <IoPlaySkipForward size={16} />
          </RoundButton>
        </div>

        <div className="audio-controls-duration">
          <span className="duration-left">{formatDuration(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="clickable"
          />
          <span className="duration-right">{formatDuration(duration)}</span>
        </div>
      </div>

      <div className="audio-controls-volume">
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="clickable"
        />
        <div className="audio-controls-volume-icons">
          <IoVolumeHigh />
          <div>{Math.round(volume * 100)}%</div>
          <IoVolumeLow />
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer

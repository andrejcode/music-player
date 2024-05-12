import { useState, useRef, useEffect, ChangeEvent } from 'react'
import AudioControls from '../AudioControls/AudioControls'
import SongInfo from '../SongInfo/SongInfo'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import songs, { type Song } from '@/songs'
import useSongStore from '@/store'
import VolumeControl from '../VolumeControl/VolumeControl'
import './MusicPlayer.css'

function MusicPlayer() {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const isPlaying = useSongStore(state => state.isPlaying)
  const setIsPlaying = useSongStore(state => state.setIsPlaying)
  const currentSong = useSongStore(state => state.currentSong)
  const changeSong = useSongStore(state => state.changeSong)
  const favoriteSongs = useSongStore(state => state.favoriteSongs)
  const addSongToFavorites = useSongStore(state => state.addSongToFavorites)
  const removeSongFromFavorites = useSongStore(state => state.removeSongFromFavorites)
  const volume = useSongStore(state => state.volume)
  const changeVolume = useSongStore(state => state.changeVolume)

  const audioRef = useRef<HTMLAudioElement | null>(null)

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
  }, [audioRef, setIsPlaying])

  function toggleIsPlaying() {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      audioRef.current?.play()
      setIsPlaying(true)
    }
  }

  function playNextSong() {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songs.length
    changeSong(songs[nextIndex])
    setIsPlaying(false)
  }

  function playPreviousSong() {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length
    changeSong(songs[previousIndex])
    setIsPlaying(false)
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
      changeVolume(newVolume)
    }
  }

  function isSongFavorite(song: Song) {
    const foundSong = favoriteSongs.find(favoriteSong => favoriteSong.id === song.id)

    if (foundSong) {
      return true
    }

    return false
  }

  function handleAddOrRemoveSongFromFavorites(song: Song) {
    const foundSong = favoriteSongs.find(favoriteSong => favoriteSong.id === song.id)

    if (foundSong) {
      removeSongFromFavorites(song)
    } else {
      addSongToFavorites(song)
    }
  }

  return (
    <div className="music-player">
      <div className="song-info-with-favorite-button">
        <FavoriteButton
          isFavorite={isSongFavorite(currentSong)}
          onClick={() => handleAddOrRemoveSongFromFavorites(currentSong)}
        />
        <SongInfo title={currentSong.title} artist={currentSong.artist} />
      </div>

      <AudioControls
        ref={audioRef}
        currentSong={currentSong}
        playPreviousSong={playPreviousSong}
        toggleIsPlaying={toggleIsPlaying}
        playNextSong={playNextSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        handleSeek={handleSeek}
      />

      <VolumeControl volume={volume} handleVolumeChange={handleVolumeChange} />
    </div>
  )
}

export default MusicPlayer

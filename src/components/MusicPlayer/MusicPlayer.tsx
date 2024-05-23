import { useEffect } from 'react'
import AudioControls from '../AudioControls/AudioControls'
import VolumeControl from '../VolumeControl/VolumeControl'
import SongInfoWithFavorite from '../SongInfoWithFavorite/SongInfoWithFavorite'
import useSongStore from '@/store'
import './MusicPlayer.css'

function MusicPlayer() {
  const audio = useSongStore(state => state.audio)
  const currentSong = useSongStore(state => state.currentSong)
  const setDuration = useSongStore(state => state.setDuration)
  const setCurrentTime = useSongStore(state => state.setCurrentTime)
  const setIsPlaying = useSongStore(state => state.setIsPlaying)

  useEffect(() => {
    audio.src = `songs/${currentSong.fileName}`
  }, [audio, currentSong.fileName])

  useEffect(() => {
    if (!audio) return

    function handleLoadedData() {
      setDuration(audio!.duration)
    }

    function handleTimeUpdate() {
      setCurrentTime(audio!.currentTime)
    }

    function handleEnded() {
      setCurrentTime(0)
      setIsPlaying(false)
    }

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audio, setCurrentTime, setDuration, setIsPlaying])

  return (
    <div className="music-player">
      <SongInfoWithFavorite />
      <AudioControls />
      <VolumeControl />
    </div>
  )
}

export default MusicPlayer

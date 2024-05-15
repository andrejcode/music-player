import { useRef } from 'react'
import AudioControls from '../AudioControls/AudioControls'
import VolumeControl from '../VolumeControl/VolumeControl'
import SongInfoWithFavorite from '../SongInfoWithFavorite/SongInfoWithFavorite'
import './MusicPlayer.css'

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  return (
    <div className="music-player">
      <SongInfoWithFavorite />
      <AudioControls audioRef={audioRef} />
      <VolumeControl audioRef={audioRef} />
    </div>
  )
}

export default MusicPlayer

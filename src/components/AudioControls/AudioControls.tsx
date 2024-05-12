import { ChangeEvent, forwardRef } from 'react'
import RoundButton from '../RoundButton/RoundButton'
import { IoPause, IoPlay, IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5'
import formatDuration from '@/utils'
import { type Song } from '@/songs'
import './AudioControls.css'

const PATH_TO_SONG = 'src/assets/songs/'

interface AudioControlsProps {
  currentSong: Song
  playPreviousSong: () => void
  toggleIsPlaying: () => void
  playNextSong: () => void
  isPlaying: boolean
  currentTime: number
  duration: number
  handleSeek: (event: ChangeEvent<HTMLInputElement>) => void
}

const AudioControls = forwardRef<HTMLAudioElement, AudioControlsProps>(function AudioControls(
  {
    currentSong,
    playPreviousSong,
    toggleIsPlaying,
    isPlaying,
    playNextSong,
    currentTime,
    duration,
    handleSeek,
  },
  audioRef,
) {
  return (
    <div className="audio-controls">
      <audio ref={audioRef} src={PATH_TO_SONG + currentSong.fileName} preload="metadata">
        Your browser does not support the audio element.
      </audio>

      <div className="audio-controls-buttons">
        <RoundButton onClick={playPreviousSong}>
          <IoPlaySkipBack size={16} />
        </RoundButton>

        <button className="play-pause-button clickable" onClick={toggleIsPlaying}>
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
  )
})

export default AudioControls

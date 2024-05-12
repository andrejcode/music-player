import { ChangeEvent } from 'react'
import { IoVolumeHigh, IoVolumeLow } from 'react-icons/io5'
import './VolumeControl.css'

interface VolumeControlProps {
  volume: number
  handleVolumeChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function VolumeControl({ volume, handleVolumeChange }: VolumeControlProps) {
  return (
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
  )
}

export default VolumeControl

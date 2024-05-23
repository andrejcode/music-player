import { ChangeEvent, useEffect } from 'react'
import { IoVolumeHigh, IoVolumeLow } from 'react-icons/io5'
import useSongStore from '@/store'
import './VolumeControl.css'

function VolumeControl() {
  const audio = useSongStore(state => state.audio)
  const volume = useSongStore(state => state.volume)
  const changeVolume = useSongStore(state => state.changeVolume)

  useEffect(() => {
    audio.volume = volume
  }, [audio, volume])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowUp') {
        changeVolume(Math.min(volume + 0.1, 1))
      } else if (event.key === 'ArrowDown') {
        changeVolume(Math.max(volume - 0.1, 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [volume, changeVolume])

  function handleVolumeChange(event: ChangeEvent<HTMLInputElement>) {
    const newVolume = parseInt(event.target.value) / 100
    audio.volume = newVolume
    changeVolume(newVolume)
  }

  return (
    <div className="audio-controls-volume">
      <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={handleVolumeChange}
        className="clickable"
        autoFocus={false}
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

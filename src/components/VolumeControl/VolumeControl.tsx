import { ChangeEvent, RefObject, useEffect } from 'react'
import { IoVolumeHigh, IoVolumeLow } from 'react-icons/io5'
import './VolumeControl.css'
import useSongStore from '@/store'

interface VolumeControlProps {
  audioRef: RefObject<HTMLAudioElement>
}

function VolumeControl({ audioRef }: VolumeControlProps) {
  const volume = useSongStore(state => state.volume)
  const changeVolume = useSongStore(state => state.changeVolume)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [audioRef, volume])

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
    if (audioRef.current) {
      const newVolume = parseInt(event.target.value) / 100
      audioRef.current.volume = newVolume
      changeVolume(newVolume)
    }
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

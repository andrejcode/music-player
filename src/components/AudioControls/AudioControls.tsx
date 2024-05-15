import AudioContainer from '../AudioContainer/AudioContainer'
import DurationControl from '../DurationControl/DurationControl'
import AudioControlsButtons from '../AudioControlsButtons/AudioControlsButtons'
import { AudioRefProp } from '@/types'
import './AudioControls.css'

function AudioControls({ audioRef }: AudioRefProp) {
  return (
    <div className="audio-controls">
      <AudioContainer audioRef={audioRef} />
      <AudioControlsButtons audioRef={audioRef} />
      <DurationControl audioRef={audioRef} />
    </div>
  )
}

export default AudioControls

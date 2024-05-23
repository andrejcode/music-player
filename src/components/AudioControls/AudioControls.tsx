import DurationControl from '../DurationControl/DurationControl'
import AudioControlsButtons from '../AudioControlsButtons/AudioControlsButtons'
import './AudioControls.css'

function AudioControls() {
  return (
    <div className="audio-controls">
      <AudioControlsButtons />
      <DurationControl />
    </div>
  )
}

export default AudioControls

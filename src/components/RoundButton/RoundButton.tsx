import './RoundButton.css'

interface RoundButtonProps {
  children: React.ReactElement
  onClick: () => void
}

function RoundButton({ children, onClick }: RoundButtonProps) {
  return (
    <button className="round-button clickable" onClick={onClick}>
      {children}
    </button>
  )
}

export default RoundButton

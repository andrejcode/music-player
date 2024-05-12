import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import './FavoriteButton.css'

interface FavoriteButtonProps {
  isFavorite: boolean
  onClick: () => void
}

function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <button className="favorite-button clickable" onClick={onClick}>
      {isFavorite ? <IoHeart size={32} /> : <IoHeartOutline size={32} />}
    </button>
  )
}

export default FavoriteButton

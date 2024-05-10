import { FaHeart, FaRegHeart } from 'react-icons/fa'
import './FavoriteButton.css'

interface FavoriteButtonProps {
  isFavorite: boolean
}

function FavoriteButton({ isFavorite }: FavoriteButtonProps) {
  return (
    <button className="favorite-button clickable">
      {isFavorite ? <FaHeart size={48} /> : <FaRegHeart size={48} />}
    </button>
  )
}

export default FavoriteButton

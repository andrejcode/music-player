import AlbumCoverPlaceholder from '../AlbumCoverPlaceholder/AlbumCoverPlaceholder'
import './SongInfo.css'

interface SongInfoProps {
  title: string
  artist: string
  onClick?: () => void
}

function SongInfo({ title, artist, onClick }: SongInfoProps) {
  return (
    <div className={`song-info ${onClick ? 'clickable' : ''}`} onClick={onClick}>
      <AlbumCoverPlaceholder />
      <div className="song-title-and-artist">
        <div className="song-title">{title}</div>
        <div className="song-artist">{artist}</div>
      </div>
    </div>
  )
}

export default SongInfo

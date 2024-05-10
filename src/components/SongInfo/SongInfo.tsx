import AlbumCoverPlaceholder from '../AlbumCoverPlaceholder/AlbumCoverPlaceholder'
import './SongInfo.css'

function SongInfo() {
  return (
    <div className="song-info">
      <AlbumCoverPlaceholder />
      <div className="song-title-and-artist">
        <div className="song-title">Koje Si Vere</div>
        <div className="song-artist">Rade Kosmajac</div>
      </div>
    </div>
  )
}

export default SongInfo

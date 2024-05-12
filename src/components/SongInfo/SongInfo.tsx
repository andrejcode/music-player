import AlbumCoverPlaceholder from '../AlbumCoverPlaceholder/AlbumCoverPlaceholder'
import './SongInfo.css'

const MAX_SONG_INFO_WIDTH = 25

interface SongInfoProps {
  title: string
  artist: string
  onClick?: () => void
}

function SongInfo({ title, artist, onClick }: SongInfoProps) {
  function handleTextOverflow(text: string) {
    if (text.length > MAX_SONG_INFO_WIDTH) {
      return `${text.slice(0, MAX_SONG_INFO_WIDTH - 3)}...`
    }
    return text
  }

  return (
    <div className={`song-info ${onClick ? 'clickable' : ''}`} onClick={onClick}>
      <AlbumCoverPlaceholder />
      <div className="song-title-and-artist">
        <div className="song-title">{handleTextOverflow(title)}</div>
        <div className="song-artist">{handleTextOverflow(artist)}</div>
      </div>
    </div>
  )
}

export default SongInfo

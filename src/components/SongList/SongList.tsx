import SongInfo from '../SongInfo/SongInfo'
import { type Song } from '@/songs'
import './SongList.css'
import useSongStore from '@/store'

interface SongListProps {
  currentSong: Song
  songs: Song[]
}

function SongList({ currentSong, songs }: SongListProps) {
  const changeSong = useSongStore(state => state.changeSong)
  const setIsPlaying = useSongStore(state => state.setIsPlaying)

  function handleSongClick(song: Song) {
    changeSong(song)
    setIsPlaying(false)
  }

  return (
    <div className="song-list">
      {songs.length > 0 ? (
        songs.map(song => (
          <div
            key={song.id}
            className={`song-spacer ${currentSong.id === song.id ? 'current-song' : ''}`}
          >
            <SongInfo
              title={song.title}
              artist={song.artist}
              onClick={() => handleSongClick(song)}
            />
          </div>
        ))
      ) : (
        <p className="no-songs">There are no songs.</p>
      )}
    </div>
  )
}

export default SongList

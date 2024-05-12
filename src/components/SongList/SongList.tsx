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
      {songs.map(song => (
        <div
          className={`song-spacer ${currentSong.id === song.id ? 'current-song' : ''}`}
          key={song.id}
        >
          <SongInfo title={song.title} artist={song.artist} onClick={() => handleSongClick(song)} />
        </div>
      ))}
    </div>
  )
}

export default SongList

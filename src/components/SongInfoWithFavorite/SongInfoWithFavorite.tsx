import useSongStore from '@/store'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import SongInfo from '../SongInfo/SongInfo'
import { type Song } from '@/songs'
import './SongInfoWithFavorite.css'

function SongInfoWithFavorite() {
  const currentSong = useSongStore(state => state.currentSong)
  const favoriteSongs = useSongStore(state => state.favoriteSongs)
  const addSongToFavorites = useSongStore(state => state.addSongToFavorites)
  const removeSongFromFavorites = useSongStore(state => state.removeSongFromFavorites)

  function isSongFavorite(song: Song) {
    const foundSong = favoriteSongs.find(favoriteSong => favoriteSong.id === song.id)

    if (foundSong) {
      return true
    }

    return false
  }

  function handleAddOrRemoveSongFromFavorites(song: Song) {
    const foundSong = favoriteSongs.find(favoriteSong => favoriteSong.id === song.id)

    if (foundSong) {
      removeSongFromFavorites(song)
    } else {
      addSongToFavorites(song)
    }
  }

  return (
    <div className="song-info-with-favorite-button">
      <FavoriteButton
        isFavorite={isSongFavorite(currentSong)}
        onClick={() => handleAddOrRemoveSongFromFavorites(currentSong)}
      />
      <SongInfo title={currentSong.title} artist={currentSong.artist} />
    </div>
  )
}

export default SongInfoWithFavorite

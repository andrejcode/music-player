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

  function findFavoriteSong(songId: number) {
    return favoriteSongs.find(favoriteSong => favoriteSong.id === songId)
  }

  function isSongFavorite(song: Song) {
    return !!findFavoriteSong(song.id)
  }

  function handleAddOrRemoveSongFromFavorites(song: Song) {
    if (findFavoriteSong(song.id)) {
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

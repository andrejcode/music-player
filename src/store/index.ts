import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import songs, { type Song } from '@/songs'

interface SongStore {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  currentSong: Song
  changeSong: (newSong: Song) => void
  favoriteSongs: Song[]
  addSongToFavorites: (songToAdd: Song) => void
  removeSongFromFavorites: (songToRemove: Song) => void
  volume: number
  changeVolume: (newVolume: number) => void
}

const useSongStore = create<SongStore>()(
  persist(
    set => ({
      isPlaying: false,
      setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
      currentSong: songs[0],
      changeSong: (newSong: Song) => set({ currentSong: newSong }),
      favoriteSongs: [],
      addSongToFavorites: songToAdd =>
        set(state => ({ favoriteSongs: [...state.favoriteSongs, songToAdd] })),
      removeSongFromFavorites: songToRemove =>
        set(state => ({
          favoriteSongs: state.favoriteSongs.filter(song => song.id !== songToRemove.id),
        })),
      volume: 1,
      changeVolume: newVolume => set({ volume: newVolume }),
    }),
    {
      name: 'song-storage',
      partialize: state => ({
        currentSong: state.currentSong,
        favoriteSongs: state.favoriteSongs,
        volume: state.volume,
      }),
    },
  ),
)

export default useSongStore

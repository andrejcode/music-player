import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import songs, { type Song } from '@/songs'

interface SongStore {
  currentTime: number
  setCurrentTime: (newCurrentTime: number) => void
  duration: number
  setDuration: (newDuration: number) => void
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
      currentTime: 0,
      setCurrentTime: newCurrentTime => set({ currentTime: newCurrentTime }),
      duration: 0,
      setDuration: newDuration => set({ duration: newDuration }),
      isPlaying: false,
      setIsPlaying: isPlaying => set({ isPlaying: isPlaying }),
      currentSong: songs[0],
      changeSong: newSong => set({ currentSong: newSong }),
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

import { useState } from 'react'
import MusicPlayer from './MusicPlayer/MusicPlayer'
import Tabs from './Tabs/Tabs'
import SongList from './SongList/SongList'
import useSongStore from '@/store'
import songs, { type Song } from '@/songs'

function App() {
  const [activeTab, setActiveTab] = useState('List')

  const currentSong = useSongStore(state => state.currentSong)
  const favoriteSongs = useSongStore(state => state.favoriteSongs)

  function songsToShow(): Song[] {
    switch (activeTab) {
      case 'List':
        return songs
      case 'Favorites':
        return favoriteSongs
      default:
        return []
    }
  }

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <SongList currentSong={currentSong} songs={songsToShow()} />
      <MusicPlayer />
    </>
  )
}

export default App

import { useState } from 'react'
import MusicPlayer from './MusicPlayer/MusicPlayer'
import songs from '@/songs'
import { FaList, FaHeart } from 'react-icons/fa'
import SongInfo from './SongInfo/SongInfo'

function App() {
  const [activeTab, setActiveTab] = useState('List')

  const tabs = [
    { id: 'list-tab', label: 'List', icon: <FaList color="#fff" /> },
    { id: 'favorites-tab', label: 'Favorites', icon: <FaHeart color="#fff" /> },
  ]

  function handleTabClick(tab: string) {
    setActiveTab(tab)
  }

  return (
    <>
      <div className="tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab clickable ${activeTab === tab.label ? 'active-tab' : ''}`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.icon}
            <span className="tab-label">{tab.label}</span>
          </div>
        ))}
      </div>

      <div className="song-list">
        {songs.map(song => (
          <div className="song-spacer" key={song.id}>
            <SongInfo title={song.title} artist={song.artist} />
          </div>
        ))}
      </div>

      <MusicPlayer />
    </>
  )
}

export default App

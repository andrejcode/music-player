import { Dispatch, SetStateAction } from 'react'
import { IoHeart, IoList } from 'react-icons/io5'
import './Tabs.css'

interface TabsProps {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
}

function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs = [
    { id: 'list-tab', label: 'List', icon: <IoList color="#fff" /> },
    { id: 'favorites-tab', label: 'Favorites', icon: <IoHeart color="#fff" /> },
  ]

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`tab clickable ${activeTab === tab.label ? 'active-tab' : ''}`}
          onClick={() => setActiveTab(tab.label)}
        >
          {tab.icon}
          <span className="tab-label">{tab.label}</span>
        </div>
      ))}
    </div>
  )
}

export default Tabs

import { Dispatch, SetStateAction } from 'react'
import { IoHeart, IoList } from 'react-icons/io5'
import './Tabs.css'
import Tab from '../Tab/Tab'

interface TabsProps {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
}

export interface TabType {
  id: string
  label: string
  icon: JSX.Element
}

const tabs: TabType[] = [
  { id: 'list-tab', label: 'List', icon: <IoList color="#fff" /> },
  { id: 'favorites-tab', label: 'Favorites', icon: <IoHeart color="#fff" /> },
]

function Tabs({ activeTab, setActiveTab }: TabsProps) {
  function changeActiveTab(tabName: string) {
    setActiveTab(tabName)
  }

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <Tab key={tab.id} tab={tab} activeTab={activeTab} changeActiveTab={changeActiveTab} />
      ))}
    </div>
  )
}

export default Tabs

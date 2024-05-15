import { type TabType } from '../Tabs/Tabs'
import './Tab.css'

interface TabProps {
  tab: TabType
  activeTab: string
  changeActiveTab: (tabName: string) => void
}

function Tab({ tab, activeTab, changeActiveTab }: TabProps) {
  return (
    <div
      className={`tab clickable ${activeTab === tab.label ? 'active-tab' : ''}`}
      onClick={() => changeActiveTab(tab.label)}
    >
      {tab.icon}
      <span className="tab-label">{tab.label}</span>
    </div>
  )
}

export default Tab

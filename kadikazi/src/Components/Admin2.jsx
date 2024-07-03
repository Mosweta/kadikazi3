import { useState } from 'react'
import './MyHome.css'
import Header from './Header'
import Sidebar from './Sidebar'
import MyHome from './MyHome'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <MyHome />
    </div>
  )
}

export default App

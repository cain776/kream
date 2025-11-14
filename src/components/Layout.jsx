import { useState, useEffect, useCallback, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import TabBar from './TabBar'
import { getAllMenuItems } from '../constants/menuConfig'

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [openTabs, setOpenTabs] = useState([])
  const location = useLocation()
  
  // 메뉴 아이템을 메모이제이션
  const menuItems = useMemo(() => getAllMenuItems(), [])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  // 탭 제거
  const handleRemoveTab = useCallback((path) => {
    setOpenTabs(prevTabs => prevTabs.filter(tab => tab.path !== path))
  }, [])

  // 페이지 방문 시 자동으로 탭 추가
  useEffect(() => {
    const currentMenuItem = menuItems.find(item => item.path === location.pathname)
    if (currentMenuItem) {
      setOpenTabs(prevTabs => {
        // 이미 열린 탭인지 확인
        const exists = prevTabs.some(tab => tab.path === currentMenuItem.path)
        if (!exists) {
          return [...prevTabs, currentMenuItem]
        }
        return prevTabs
      })
    }
  }, [location.pathname, menuItems])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        <Header onToggleSidebar={toggleSidebar} />
        <TabBar tabs={openTabs} onRemoveTab={handleRemoveTab} />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


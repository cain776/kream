import { NavLink } from 'react-router-dom'
import { useState, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { menuConfig } from '../constants/menuConfig'

function Sidebar({ isOpen }) {
  const [expandedMenu, setExpandedMenu] = useState(null)

  const toggleSubMenu = useCallback((path) => {
    setExpandedMenu(prev => prev === path ? null : path)
  }, [])

  return (
    <aside 
      className={`bg-white border-r border-gray-200 min-h-screen transition-all duration-300 overflow-hidden fixed left-0 top-0 z-50 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* 회사명 헤더 - 탑바와 동일한 높이 */}
      <div className={`h-16 flex items-center border-b border-gray-200 ${isOpen ? 'px-6 justify-center' : 'px-2 justify-center'}`}>
        {isOpen ? (
          <div className="text-center">
            <h2 className="text-2xl font-black italic text-gray-900" style={{ fontFamily: "'Montserrat', 'Inter', sans-serif", letterSpacing: '-0.02em' }}>
              KREAM
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">ERP System v1.0</p>
          </div>
        ) : (
          <span className="text-xl font-black italic text-gray-900" style={{ fontFamily: "'Montserrat', 'Inter', sans-serif" }}>K</span>
        )}
      </div>

      {/* 메뉴 */}
      <nav className={isOpen ? 'p-4' : 'p-2'}>
        <ul className="space-y-1">
          {menuConfig.map((item) => (
            <li key={item.path}>
              {/* 메인 메뉴 */}
              {item.subMenu ? (
                <>
                  <button
                    onClick={() => isOpen && toggleSubMenu(item.path)}
                    className={`w-full flex items-center gap-3 rounded-lg text-sm font-medium transition-all ${
                      isOpen ? 'px-4 py-3' : 'px-2 py-3 justify-center'
                    } ${
                      expandedMenu === item.path
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    title={!isOpen ? item.label : ''}
                    aria-expanded={expandedMenu === item.path}
                    aria-label={`${item.label} 메뉴`}
                  >
                    <span className="text-xl flex-shrink-0 flex items-center justify-center w-6">{item.icon}</span>
                    {isOpen && (
                      <>
                        <span className="flex-1 text-left whitespace-nowrap leading-6">
                          {item.label}
                        </span>
                        <svg 
                          className={`w-4 h-4 transition-transform ${expandedMenu === item.path ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* 서브 메뉴 */}
                  {isOpen && expandedMenu === item.path && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.subMenu.map((subItem) => (
                        <li key={subItem.path}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                                isActive
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`
                            }
                          >
                            <span className="text-base flex items-center justify-center w-5">{subItem.icon}</span>
                            <span className="whitespace-nowrap leading-5">{subItem.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg text-sm font-medium transition-all ${
                      isOpen ? 'px-4 py-3' : 'px-2 py-3 justify-center'
                    } ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                  title={!isOpen ? item.label : ''}
                >
                  <span className="text-xl flex-shrink-0 flex items-center justify-center w-6">{item.icon}</span>
                  {isOpen && (
                    <span className="whitespace-nowrap leading-6">
                      {item.label}
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default memo(Sidebar)

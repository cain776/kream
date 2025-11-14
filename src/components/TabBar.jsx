import { NavLink } from 'react-router-dom'
import { useCallback, memo } from 'react'
import PropTypes from 'prop-types'

function TabBar({ tabs, onRemoveTab }) {
  if (tabs.length === 0) return null

  // 모든 탭 닫기
  const handleCloseAll = useCallback(() => {
    tabs.forEach(tab => onRemoveTab(tab.path))
  }, [tabs, onRemoveTab])

  // 개별 탭 닫기
  const handleRemoveTabClick = useCallback((e, path) => {
    e.preventDefault()
    e.stopPropagation()
    onRemoveTab(path)
  }, [onRemoveTab])

  return (
    <div className="bg-gray-50 border-b border-gray-200 sticky top-16 z-30">
      <div className="px-8 py-3 flex items-center gap-2">
        {/* 탭 목록 */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`
              }
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              
              {/* X 버튼 */}
              <button
                onClick={(e) => handleRemoveTabClick(e, tab.path)}
                className="ml-0.5 p-0.5 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
                title="탭 닫기"
                aria-label={`${tab.label} 탭 닫기`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </NavLink>
          ))}
        </div>

        {/* 전체 닫기 버튼 */}
        {tabs.length > 0 && (
          <button
            onClick={handleCloseAll}
            className="flex-shrink-0 p-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
            title="모든 탭 닫기"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  ).isRequired,
  onRemoveTab: PropTypes.func.isRequired
}

export default memo(TabBar)

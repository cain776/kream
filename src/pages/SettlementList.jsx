import { useState, useEffect } from 'react'

export default function SettlementList() {
  const [filters, setFilters] = useState({
    category: '',
    apiId: '',
    status: '',
    dateRange: '',
    startDate: '',
    endDate: ''
  })
  const [activePeriod, setActivePeriod] = useState('thismonth')

  // 날짜 포맷 함수
  const formatDate = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  // 날짜 설정 함수
  const setDateRange = (period) => {
    const today = new Date()
    let start = new Date()
    let end = new Date()

    switch(period) {
      case 'today':
        start = today
        end = today
        break
      case 'thismonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1)
        end = today
        break
      case 'lastmonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        end = new Date(today.getFullYear(), today.getMonth(), 0)
        break
      case '1month':
        start = new Date(today.setMonth(today.getMonth() - 1))
        end = new Date()
        break
      case '1year':
        start = new Date(today.setFullYear(today.getFullYear() - 1))
        end = new Date()
        break
    }

    setFilters({
      ...filters,
      startDate: formatDate(start),
      endDate: formatDate(end)
    })
    setActivePeriod(period)
  }

  // 초기 날짜 설정
  useEffect(() => {
    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    const end = today
    
    setFilters(prev => ({
      ...prev,
      startDate: formatDate(start),
      endDate: formatDate(end)
    }))
    setActivePeriod('thismonth')
  }, [])

  // 검색 필터 초기화
  const handleResetFilters = () => {
    setFilters({
      category: '',
      apiId: '',
      status: '',
      dateRange: '',
      startDate: '',
      endDate: ''
    })
    setActivePeriod('')
  }

  // API 호출
  const handleSearch = () => {
    console.log('검색 조건:', filters)
    // TODO: 실제 API 호출 로직 구현
  }

  return (
    <div className="space-y-6">
      {/* 검색 필터 바 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form className="flex flex-nowrap items-center gap-4" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          {/* 소구분 Select */}
          <div className="floating-wrapper w-40 flex-shrink-0">
            <select 
              id="category" 
              className={`floating-input ${filters.category ? 'has-value' : ''}`}
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="" disabled></option>
              <option value="Qno010 JP">Qno010 JP</option>
              <option value="Qno020 KR">Qno020 KR</option>
              <option value="Qno030 US">Qno030 US</option>
            </select>
            <label className="floating-label">소구분</label>
            {filters.category && (
              <span 
                className="select-clear" 
                onClick={() => setFilters({...filters, category: ''})}
              ></span>
            )}
          </div>

          {/* API ID Select */}
          <div className="floating-wrapper w-40 flex-shrink-0">
            <select 
              id="apiId" 
              className={`floating-input ${filters.apiId ? 'has-value' : ''}`}
              value={filters.apiId}
              onChange={(e) => setFilters({...filters, apiId: e.target.value})}
            >
              <option value="" disabled></option>
              <option value="API001">API001</option>
              <option value="API002">API002</option>
              <option value="API003">API003</option>
            </select>
            <label className="floating-label">API ID</label>
            {filters.apiId && (
              <span 
                className="select-clear" 
                onClick={() => setFilters({...filters, apiId: ''})}
              ></span>
            )}
          </div>

          {/* 주문상태 Select */}
          <div className="floating-wrapper w-40 flex-shrink-0">
            <select 
              id="status" 
              className={`floating-input ${filters.status ? 'has-value' : ''}`}
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="" disabled></option>
              <option value="전체">전체</option>
              <option value="대기">대기</option>
              <option value="처리중">처리중</option>
              <option value="완료">완료</option>
            </select>
            <label className="floating-label">주문상태</label>
            {filters.status && (
              <span 
                className="select-clear" 
                onClick={() => setFilters({...filters, status: ''})}
              ></span>
            )}
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* 시작일 */}
            <div className="floating-wrapper date-wrapper w-40">
              <input 
                id="start-date" 
                type="date" 
                className={`floating-input pr-10 ${filters.startDate ? 'has-value' : ''}`}
                value={filters.startDate}
                onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              />
              <label className="floating-label">시작일</label>
              <svg className="date-icon w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>

            <span className="text-gray-400">~</span>

            {/* 종료일 */}
            <div className="floating-wrapper date-wrapper w-40">
              <input 
                id="end-date" 
                type="date" 
                className={`floating-input pr-10 ${filters.endDate ? 'has-value' : ''}`}
                value={filters.endDate}
                onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              />
              <label className="floating-label">종료일</label>
              <svg className="date-icon w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-8 w-px bg-gray-300 flex-shrink-0"></div>

          {/* 퀵 버튼들 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button 
              type="button" 
              className={`quick-btn ${activePeriod === '1year' ? 'active' : ''}`}
              onClick={() => setDateRange('1year')}
            >
              1년
            </button>
            <button 
              type="button" 
              className={`quick-btn ${activePeriod === '1month' ? 'active' : ''}`}
              onClick={() => setDateRange('1month')}
            >
              한달
            </button>
            <button 
              type="button" 
              className={`quick-btn ${activePeriod === 'lastmonth' ? 'active' : ''}`}
              onClick={() => setDateRange('lastmonth')}
            >
              전월
            </button>
            <button 
              type="button" 
              className={`quick-btn ${activePeriod === 'thismonth' ? 'active' : ''}`}
              onClick={() => setDateRange('thismonth')}
            >
              당월
            </button>
            <button 
              type="button" 
              className={`quick-btn ${activePeriod === 'today' ? 'active' : ''}`}
              onClick={() => setDateRange('today')}
            >
              오늘
            </button>
          </div>

          {/* 액션 버튼 */}
          <div className="ml-auto flex gap-3">
            <button 
              type="button" 
              className="action-btn btn-reset"
              onClick={handleResetFilters}
            >
              초기화
            </button>
            <button 
              type="submit" 
              className="action-btn btn-submit"
            >
              API 호출
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        /* 플로팅 라벨 컨테이너 */
        .floating-wrapper {
          position: relative;
          display: inline-block;
        }

        /* Input/Select 기본 스타일 */
        .floating-input {
          width: 100%;
          height: 44px;
          padding: 12px 12px 4px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 14px;
          color: #111827;
          background: white;
          transition: all 0.2s;
        }

        /* Select 화살표 위치 조정 */
        select.floating-input {
          padding-right: 36px;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 1.5em;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }
        
        /* IE용 기본 화살표 숨기기 */
        select.floating-input::-ms-expand {
          display: none;
        }
        
        /* 드롭다운 옵션 스타일 */
        select.floating-input option {
          padding: 8px 12px;
          border: 1px solid #E5E7EB;
        }

        /* Select에 값이 있을 때 X 버튼 표시를 위한 여백 */
        select.floating-input.has-value {
          padding-right: 60px;
        }

        .floating-input:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Select 초기화 버튼 */
        .select-clear {
          position: absolute;
          right: 32px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          background: #9CA3AF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .select-clear:hover {
          background: #6B7280;
        }

        .select-clear::before,
        .select-clear::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 2px;
          background: white;
        }

        .select-clear::before {
          transform: rotate(45deg);
        }

        .select-clear::after {
          transform: rotate(-45deg);
        }

        /* 라벨 기본 스타일 - 입력창 가운데 */
        .floating-label {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #9CA3AF;
          pointer-events: none;
          transition: all 0.2s ease;
          background: white;
          padding: 0 4px;
        }

        /* Date input의 라벨은 항상 위에 (날짜 텍스트와 겹침 방지) */
        input[type="date"] + .floating-label {
          top: -8px;
          transform: translateY(0);
          font-size: 12px;
          font-weight: 500;
          color: #6B7280;
        }

        /* 값이 있거나 포커스 시 라벨이 위로 이동 */
        .floating-input:focus + .floating-label,
        .floating-input.has-value + .floating-label {
          top: -8px;
          transform: translateY(0);
          font-size: 12px;
          font-weight: 500;
          color: #6B7280;
        }

        .floating-input:focus + .floating-label {
          color: #3B82F6;
        }

        /* Date input 아이콘 */
        .date-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #9CA3AF;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        /* 퀵 버튼 스타일 */
        .quick-btn {
          height: 44px;
          padding: 0 20px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.15s;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quick-btn.active {
          background: #111827;
          color: white;
          border: 1px solid #111827;
        }

        .quick-btn:not(.active) {
          background: white;
          color: #111827;
          border: 1px solid #D1D5DB;
        }

        .quick-btn:not(.active):hover {
          background: #111827;
          color: white;
          border-color: #111827;
        }

        .quick-btn.active:hover {
          background: #374151;
          border-color: #374151;
        }

        /* 액션 버튼 스타일 */
        .action-btn {
          height: 44px;
          padding: 0 24px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.2s;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .btn-reset {
          background: white;
          border: 1px solid #D1D5DB;
          color: #6B7280;
        }

        .btn-reset:hover {
          background: #F9FAFB;
          border-color: #9CA3AF;
        }

        .btn-submit {
          background: #3B82F6;
          border: none;
          color: white;
        }

        .btn-submit:hover {
          background: #2563EB;
        }
      `}</style>


      {/* 데이터 테이블 영역 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">조회 조건을 선택하고 'API 호출' 버튼을 클릭하세요</p>
          </div>
        </div>
      </div>
    </div>
  )
}


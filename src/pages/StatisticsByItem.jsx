import { useState, useMemo, useCallback, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

// 샘플 데이터
const mockItemData = [
  { category: '입고비', amount: 42355000, ratio: 2.35, count: 4235 },
  { category: '상하차비', amount: 4800000, ratio: 0.27, count: 480 },
  { category: 'B2C 작업비', amount: 94098050000, ratio: 52.18, count: 9409805 },
  { category: 'B2B 출고비', amount: 0, ratio: 0, count: 0 },
  { category: '가공비', amount: 20700000000, ratio: 11.48, count: 2070000 },
  { category: '보관비', amount: 3965833000, ratio: 2.20, count: 396583 },
  { category: '부자재', amount: 44185170000, ratio: 24.51, count: 4418517 },
  { category: '택배/퀵/용차', amount: 468300000, ratio: 0.26, count: 46830 },
  { category: '보상비', amount: 5200000, ratio: 0.003, count: 520 },
]

const monthlyTrendData = [
  { month: '2024-04', total: 156234567 },
  { month: '2024-05', total: 163456789 },
  { month: '2024-06', total: 158234567 },
  { month: '2024-07', total: 171234567 },
  { month: '2024-08', total: 165234567 },
  { month: '2024-09', total: 180272073 },
]

export default function StatisticsByItem() {
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
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

    setStartDate(formatDate(start))
    setEndDate(formatDate(end))
    setActivePeriod(period)
  }

  // 초기 날짜 설정
  useEffect(() => {
    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    const end = today
    
    setStartDate(formatDate(start))
    setEndDate(formatDate(end))
    setActivePeriod('thismonth')
  }, [])

  // formatCurrency와 formatNumber를 useCallback으로 메모이제이션
  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(value)
  }, [])

  const formatNumber = useCallback((value) => {
    return new Intl.NumberFormat('ko-KR').format(value)
  }, [])

  // 집계 데이터를 useMemo로 메모이제이션
  const aggregatedData = useMemo(() => {
    const totalAmount = mockItemData.reduce((sum, item) => sum + item.amount, 0)
    const totalCount = mockItemData.reduce((sum, item) => sum + item.count, 0)
    const activeItems = mockItemData.filter(item => item.amount > 0).length
    
    return {
      totalAmount,
      totalCount,
      activeItems
    }
  }, [])

  // 핸들러 함수들을 useCallback으로 메모이제이션
  const handlePeriodChange = useCallback((e) => {
    setSelectedPeriod(e.target.value)
  }, [])

  const handleYearChange = useCallback((e) => {
    setSelectedYear(e.target.value)
  }, [])

  const handleMonthChange = useCallback((e) => {
    setSelectedMonth(e.target.value)
  }, [])

  return (
    <div>
      {/* 검색 필터 바 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <form className="flex flex-nowrap items-center gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="floating-wrapper w-40 flex-shrink-0">
            <select id="period" className={`floating-input ${selectedPeriod ? 'has-value' : ''}`} value={selectedPeriod} onChange={handlePeriodChange}>
              <option value="" disabled></option>
              <option value="monthly">월별</option>
              <option value="quarterly">분기별</option>
              <option value="yearly">연도별</option>
            </select>
            <label className="floating-label">기간 선택</label>
          </div>
          {selectedPeriod === 'monthly' && (
            <>
              <div className="floating-wrapper w-40 flex-shrink-0">
                <select id="year" className={`floating-input ${selectedYear ? 'has-value' : ''}`} value={selectedYear} onChange={handleYearChange}>
                  <option value="" disabled></option>
                  <option value="2024">2024년</option>
                  <option value="2023">2023년</option>
                </select>
                <label className="floating-label">연도</label>
              </div>
              <div className="floating-wrapper w-40 flex-shrink-0">
                <select id="month" className={`floating-input ${selectedMonth ? 'has-value' : ''}`} value={selectedMonth} onChange={handleMonthChange}>
                  <option value="" disabled></option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                    <option key={m} value={String(m).padStart(2, '0')}>{m}월</option>
                  ))}
                </select>
                <label className="floating-label">월</label>
              </div>
            </>
          )}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="floating-wrapper date-wrapper w-40">
              <input id="start-date" type="date" className={`floating-input pr-10 ${startDate ? 'has-value' : ''}`} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label className="floating-label">시작일</label>
              <svg className="date-icon w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-gray-400">~</span>
            <div className="floating-wrapper date-wrapper w-40">
              <input id="end-date" type="date" className={`floating-input pr-10 ${endDate ? 'has-value' : ''}`} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              <label className="floating-label">종료일</label>
              <svg className="date-icon w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-300 flex-shrink-0"></div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button type="button" className={`quick-btn ${activePeriod === '1year' ? 'active' : ''}`} onClick={() => setDateRange('1year')}>1년</button>
            <button type="button" className={`quick-btn ${activePeriod === '1month' ? 'active' : ''}`} onClick={() => setDateRange('1month')}>한달</button>
            <button type="button" className={`quick-btn ${activePeriod === 'lastmonth' ? 'active' : ''}`} onClick={() => setDateRange('lastmonth')}>전월</button>
            <button type="button" className={`quick-btn ${activePeriod === 'thismonth' ? 'active' : ''}`} onClick={() => setDateRange('thismonth')}>당월</button>
            <button type="button" className={`quick-btn ${activePeriod === 'today' ? 'active' : ''}`} onClick={() => setDateRange('today')}>오늘</button>
          </div>
          <div className="ml-auto flex gap-3">
            <button type="submit" className="action-btn btn-submit">조회</button>
            <button type="button" className="action-btn" style={{background:'#10B981',color:'white',border:'none'}}>엑셀 다운로드</button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .floating-wrapper{position:relative;display:inline-block}
        .floating-input{width:100%;height:44px;padding:12px 12px 4px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;color:#111827;background:#fff;transition:all .2s}
        select.floating-input{padding-right:36px;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right 10px center;background-size:1.5em;appearance:none;-webkit-appearance:none;-moz-appearance:none}
        select.floating-input::-ms-expand{display:none}
        select.floating-input option{padding:8px 12px;border:1px solid #E5E7EB}
        .floating-input:focus{outline:none;border-color:#3B82F6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
        .floating-label{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px;color:#9CA3AF;pointer-events:none;transition:all .2s;background:#fff;padding:0 4px}
        input[type="date"]+.floating-label{top:-8px;transform:translateY(0);font-size:12px;font-weight:500;color:#6B7280}
        .floating-input:focus+.floating-label,.floating-input.has-value+.floating-label{top:-8px;transform:translateY(0);font-size:12px;font-weight:500;color:#6B7280}
        .floating-input:focus+.floating-label{color:#3B82F6}
        .date-icon{position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;color:#9CA3AF}
        input[type="date"]::-webkit-calendar-picker-indicator{position:absolute;inset:0;opacity:0;cursor:pointer}
        .quick-btn{height:44px;padding:0 20px;font-size:14px;font-weight:600;border-radius:8px;transition:all .15s;cursor:pointer;display:flex;align-items:center;justify-content:center}
        .quick-btn.active{background:#111827;color:#fff;border:1px solid #111827}
        .quick-btn:not(.active){background:#fff;color:#111827;border:1px solid #D1D5DB}
        .quick-btn:not(.active):hover{background:#111827;color:#fff;border-color:#111827}
        .quick-btn.active:hover{background:#374151;border-color:#374151}
        .action-btn{height:44px;padding:0 24px;font-size:14px;font-weight:600;border-radius:8px;transition:all .2s;cursor:pointer;display:flex;align-items:center;justify-content:center;white-space:nowrap}
        .btn-submit{background:#3B82F6;border:none;color:#fff}
        .btn-submit:hover{background:#2563EB}
      `}</style>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">총 정산액</div>
          <div className="text-2xl font-bold text-gray-900">180,272,073원</div>
          <div className="text-xs text-green-600 mt-1">▲ 9.1% 전월 대비</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">항목 수</div>
          <div className="text-2xl font-bold text-gray-900">9개</div>
          <div className="text-xs text-gray-500 mt-1">활성 항목</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">최대 항목</div>
          <div className="text-2xl font-bold text-gray-900">B2C 작업비</div>
          <div className="text-xs text-gray-500 mt-1">52.18% 비중</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">평균 항목당 금액</div>
          <div className="text-2xl font-bold text-gray-900">20,030,230원</div>
          <div className="text-xs text-gray-500 mt-1">9개 항목 평균</div>
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 항목별 금액 막대 차트 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">항목별 정산 금액</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockItemData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelStyle={{ color: '#000' }}
              />
              <Legend />
              <Bar dataKey="amount" fill="#3b82f6" name="금액" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 항목별 구성비 파이 차트 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">항목별 구성비</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockItemData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, ratio }) => `${category} ${ratio.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="ratio"
              >
                {mockItemData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 월별 추이 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 정산 추이</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="total" fill="#10b981" name="총 정산액" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 상세 테이블 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">항목별 상세 내역</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  항목
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  금액
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  구성비
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  건수
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  건당 평균
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockItemData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {item.ratio.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {formatNumber(item.count)}건
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {item.count > 0 ? formatCurrency(item.amount / item.count) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.amount > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.amount > 0 ? '활성' : '미사용'}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4 text-sm text-gray-900">합계</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {formatCurrency(aggregatedData.totalAmount)}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">100.00%</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {formatNumber(aggregatedData.totalCount)}건
                </td>
                <td colSpan="2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


import { useState, useMemo, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

// 샘플 데이터
const mockClientData = [
  { 
    clientCode: 'CLI001', 
    clientName: '이엑스메이트', 
    totalAmount: 180272073, 
    itemCount: 9,
    lastSettlement: '2024-09-30',
    status: '정상',
    trend: '▲',
    growthRate: 9.1
  },
  { 
    clientCode: 'CLI002', 
    clientName: '크림코퍼레이션', 
    totalAmount: 156234567, 
    itemCount: 8,
    lastSettlement: '2024-09-28',
    status: '정상',
    trend: '▲',
    growthRate: 5.3
  },
  { 
    clientCode: 'CLI003', 
    clientName: '글로벌로지스', 
    totalAmount: 98234567, 
    itemCount: 7,
    lastSettlement: '2024-09-25',
    status: '정상',
    trend: '▼',
    growthRate: -2.1
  },
  { 
    clientCode: 'CLI004', 
    clientName: '스마트물류', 
    totalAmount: 75234567, 
    itemCount: 6,
    lastSettlement: '2024-09-27',
    status: '정상',
    trend: '▲',
    growthRate: 12.5
  },
]

const monthlyClientTrendData = [
  { month: '2024-04', client1: 156234567, client2: 148234567, client3: 102234567, client4: 68234567 },
  { month: '2024-05', client1: 163456789, client2: 152456789, client3: 98456789, client4: 72456789 },
  { month: '2024-06', client1: 158234567, client2: 154234567, client3: 95234567, client4: 70234567 },
  { month: '2024-07', client1: 171234567, client2: 149234567, client3: 101234567, client4: 78234567 },
  { month: '2024-08', client1: 165234567, client2: 148234567, client3: 100234567, client4: 67234567 },
  { month: '2024-09', client1: 180272073, client2: 156234567, client3: 98234567, client4: 75234567 },
]

export default function StatisticsByClient() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedMonth, setSelectedMonth] = useState('09')
  const [searchTerm, setSearchTerm] = useState('')

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

  // 필터링된 거래처 목록을 useMemo로 메모이제이션
  const filteredClients = useMemo(() => {
    return mockClientData.filter(client =>
      client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.clientCode.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // 집계 데이터를 useMemo로 메모이제이션
  const aggregatedData = useMemo(() => {
    const totalAmount = mockClientData.reduce((sum, client) => sum + client.totalAmount, 0)
    return { totalAmount }
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

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <div>
      {/* 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기간 선택</label>
            <select 
              value={selectedPeriod}
              onChange={handlePeriodChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="monthly">월별</option>
              <option value="quarterly">분기별</option>
              <option value="yearly">연도별</option>
            </select>
          </div>

          {selectedPeriod === 'monthly' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연도</label>
                <select 
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="2024">2024년</option>
                  <option value="2023">2023년</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">월</label>
                <select 
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                    <option key={m} value={String(m).padStart(2, '0')}>
                      {m}월
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">거래처 검색</label>
            <input
              type="text"
              placeholder="거래처명 또는 코드 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full max-w-xs"
            />
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 mt-6">
            조회
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 mt-6">
            📥 엑셀 다운로드
          </button>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">총 거래처 수</div>
          <div className="text-2xl font-bold text-gray-900">{mockClientData.length}개</div>
          <div className="text-xs text-gray-500 mt-1">활성 거래처</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">총 정산액</div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(aggregatedData.totalAmount).slice(0, -1)}</div>
          <div className="text-xs text-green-600 mt-1">▲ 6.5% 전월 대비</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">최대 거래처</div>
          <div className="text-2xl font-bold text-gray-900">이엑스메이트</div>
          <div className="text-xs text-gray-500 mt-1">{formatCurrency(180272073)}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">평균 정산액</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(aggregatedData.totalAmount / mockClientData.length).slice(0, -1)}
          </div>
          <div className="text-xs text-gray-500 mt-1">거래처당 평균</div>
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 거래처별 정산 금액 막대 차트 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">거래처별 정산 금액</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockClientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="clientName" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelStyle={{ color: '#000' }}
              />
              <Legend />
              <Bar dataKey="totalAmount" fill="#3b82f6" name="정산액" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 월별 추이 라인 차트 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 거래처 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyClientTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="client1" stroke="#3b82f6" name="이엑스메이트" strokeWidth={2} />
              <Line type="monotone" dataKey="client2" stroke="#10b981" name="크림코퍼레이션" strokeWidth={2} />
              <Line type="monotone" dataKey="client3" stroke="#f59e0b" name="글로벌로지스" strokeWidth={2} />
              <Line type="monotone" dataKey="client4" stroke="#ef4444" name="스마트물류" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 상세 테이블 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">거래처별 상세 내역</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  거래처 코드
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  거래처명
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  정산 금액
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  구성비
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  항목 수
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  최종 정산일
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  증감률
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.clientCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {formatCurrency(client.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {((client.totalAmount / aggregatedData.totalAmount) * 100).toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                    {client.itemCount}개
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                    {client.lastSettlement}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={client.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {client.trend} {Math.abs(client.growthRate)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {client.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="2" className="px-6 py-4 text-sm text-gray-900">합계</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {formatCurrency(aggregatedData.totalAmount)}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">100.00%</td>
                <td colSpan="4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


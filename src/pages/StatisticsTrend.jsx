import { useState, useMemo, useCallback } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 샘플 데이터
const monthlyTrendData = [
  { month: '2024-01', total: 142234567, b2c: 72000000, material: 38000000, delivery: 25000000, others: 7234567 },
  { month: '2024-02', total: 148234567, b2c: 76000000, material: 40000000, delivery: 26000000, others: 6234567 },
  { month: '2024-03', total: 156234567, b2c: 82000000, material: 42000000, delivery: 24000000, others: 8234567 },
  { month: '2024-04', total: 163456789, b2c: 88000000, material: 44000000, delivery: 23000000, others: 8456789 },
  { month: '2024-05', total: 158234567, b2c: 84000000, material: 42000000, delivery: 25000000, others: 7234567 },
  { month: '2024-06', total: 171234567, b2c: 92000000, material: 45000000, delivery: 26000000, others: 8234567 },
  { month: '2024-07', total: 165234567, b2c: 87000000, material: 43000000, delivery: 27000000, others: 8234567 },
  { month: '2024-08', total: 175234567, b2c: 95000000, material: 46000000, delivery: 26000000, others: 8234567 },
  { month: '2024-09', total: 180272073, b2c: 94098050, material: 44185170, delivery: 468300, others: 41520553 },
]

const quarterlyData = [
  { quarter: '2023-Q4', total: 425234567, growth: 5.2 },
  { quarter: '2024-Q1', total: 467925923, growth: 10.0 },
  { quarter: '2024-Q2', total: 492703901, growth: 5.3 },
  { quarter: '2024-Q3', total: 520741207, growth: 5.7 },
]

const yearlyData = [
  { year: '2022', total: 1523456789, growth: 0 },
  { year: '2023', total: 1734567890, growth: 13.9 },
  { year: '2024', total: 1957604598, growth: 12.9 },
]

const categoryGrowthData = [
  { category: 'B2C 작업비', growth: 15.3, contribution: 52.18 },
  { category: '부자재', growth: 8.7, contribution: 24.51 },
  { category: '가공비', growth: 12.1, contribution: 11.48 },
  { category: '배송비', growth: -5.2, contribution: 0.26 },
  { category: '보관비', growth: 6.3, contribution: 2.20 },
]

export default function StatisticsTrend() {
  const [selectedView, setSelectedView] = useState('monthly')
  const [selectedMetric, setSelectedMetric] = useState('total')
  const [comparisonMode, setComparisonMode] = useState('amount')

  // 포맷팅 함수들을 useCallback으로 메모이제이션
  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(value)
  }, [])

  const formatCompact = useCallback((value) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억`
    } else if (value >= 10000) {
      return `${(value / 10000).toFixed(0)}만`
    }
    return value.toString()
  }, [])

  // 데이터 선택 함수를 useCallback으로 메모이제이션
  const getCurrentData = useCallback(() => {
    switch (selectedView) {
      case 'monthly': return monthlyTrendData
      case 'quarterly': return quarterlyData
      case 'yearly': return yearlyData
      default: return monthlyTrendData
    }
  }, [selectedView])

  // 계산된 데이터를 useMemo로 메모이제이션
  const calculatedMetrics = useMemo(() => {
    const data = getCurrentData()
    if (data.length < 2) return { latestGrowth: 0, average: 0 }
    
    const latest = data[data.length - 1].total
    const previous = data[data.length - 2].total
    const latestGrowth = (((latest - previous) / previous) * 100).toFixed(1)
    
    const sum = data.reduce((acc, item) => acc + item.total, 0)
    const average = Math.round(sum / data.length)
    
    return { latestGrowth, average }
  }, [getCurrentData])

  // 핸들러 함수들을 useCallback으로 메모이제이션
  const handleViewChange = useCallback((e) => {
    setSelectedView(e.target.value)
  }, [])

  const handleMetricChange = useCallback((e) => {
    setSelectedMetric(e.target.value)
  }, [])

  const handleComparisonModeChange = useCallback((e) => {
    setComparisonMode(e.target.value)
  }, [])

  return (
    <div>
      {/* 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기간 단위</label>
            <select 
              value={selectedView}
              onChange={handleViewChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="monthly">월별</option>
              <option value="quarterly">분기별</option>
              <option value="yearly">연도별</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">표시 지표</label>
            <select 
              value={selectedMetric}
              onChange={handleMetricChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="total">전체</option>
              <option value="category">카테고리별</option>
              <option value="growth">성장률</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비교 모드</label>
            <select 
              value={comparisonMode}
              onChange={handleComparisonModeChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="amount">금액</option>
              <option value="percentage">비율</option>
              <option value="yoy">전년 동기 대비</option>
            </select>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 mt-6">
            조회
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 mt-6">
            📥 리포트 다운로드
          </button>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">최근 정산액</div>
          <div className="text-2xl font-bold text-gray-900">180.3억원</div>
          <div className="text-xs text-green-600 mt-1">▲ {calculatedMetrics.latestGrowth}% 성장</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">평균 정산액</div>
          <div className="text-2xl font-bold text-gray-900">{formatCompact(calculatedMetrics.average)}</div>
          <div className="text-xs text-gray-500 mt-1">{selectedView === 'monthly' ? '월평균' : selectedView === 'quarterly' ? '분기평균' : '연평균'}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">최고 성장 항목</div>
          <div className="text-2xl font-bold text-gray-900">B2C 작업비</div>
          <div className="text-xs text-green-600 mt-1">▲ 15.3% 성장</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">전년 동기 대비</div>
          <div className="text-2xl font-bold text-gray-900">+12.9%</div>
          <div className="text-xs text-gray-500 mt-1">2024 vs 2023</div>
        </div>
      </div>

      {/* 메인 트렌드 차트 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedView === 'monthly' ? '월별' : selectedView === 'quarterly' ? '분기별' : '연도별'} 정산 추이
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              라인 차트
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              영역 차트
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          {selectedMetric === 'total' ? (
            <AreaChart data={getCurrentData()}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={selectedView === 'monthly' ? 'month' : selectedView === 'quarterly' ? 'quarter' : 'year'} 
                fontSize={12} 
              />
              <YAxis fontSize={12} tickFormatter={formatCompact} />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelStyle={{ color: '#000' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                name="총 정산액"
                strokeWidth={2}
              />
            </AreaChart>
          ) : selectedMetric === 'category' ? (
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={formatCompact} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="b2c" stroke="#3b82f6" name="B2C 작업비" strokeWidth={2} />
              <Line type="monotone" dataKey="material" stroke="#10b981" name="부자재" strokeWidth={2} />
              <Line type="monotone" dataKey="delivery" stroke="#f59e0b" name="배송비" strokeWidth={2} />
              <Line type="monotone" dataKey="others" stroke="#ef4444" name="기타" strokeWidth={2} />
            </LineChart>
          ) : (
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="growth" fill="#10b981" name="성장률 (%)" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 카테고리별 성장률 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리별 성장률</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryGrowthData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={12} />
              <YAxis dataKey="category" type="category" width={100} fontSize={12} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="growth" fill="#3b82f6" name="성장률 (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 연도별 비교 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">연도별 정산액 비교</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={formatCompact} />
              <Tooltip 
                formatter={(value, name) => name === 'total' ? formatCurrency(value) : `${value}%`}
              />
              <Legend />
              <Bar dataKey="total" fill="#3b82f6" name="정산액" />
              <Bar dataKey="growth" fill="#10b981" name="성장률 (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 상세 분석 테이블 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">상세 추이 분석</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  기간
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 정산액
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  전월 대비
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  전년 동기 대비
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  트렌드
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyTrendData.map((item, index) => {
                const prevMonth = index > 0 ? monthlyTrendData[index - 1].total : item.total
                const monthGrowth = ((item.total - prevMonth) / prevMonth * 100).toFixed(1)
                const yoyGrowth = 8.5 // 예시 데이터
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                      {formatCurrency(item.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={parseFloat(monthGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {parseFloat(monthGrowth) >= 0 ? '▲' : '▼'} {Math.abs(monthGrowth)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-blue-600">
                      ▲ {yoyGrowth}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-2xl">
                        {parseFloat(monthGrowth) >= 5 ? '🔥' : parseFloat(monthGrowth) >= 0 ? '📈' : '📉'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 인사이트 카드 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <div className="font-semibold text-blue-900 mb-1">성장 추세</div>
              <div className="text-sm text-blue-700">
                최근 3개월간 지속적인 상승세를 보이고 있습니다. 평균 성장률은 7.1%입니다.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📊</div>
            <div>
              <div className="font-semibold text-green-900 mb-1">주요 동인</div>
              <div className="text-sm text-green-700">
                B2C 작업비 증가가 전체 성장의 65%를 기여하고 있습니다.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="font-semibold text-orange-900 mb-1">주의 항목</div>
              <div className="text-sm text-orange-700">
                배송비 항목이 5.2% 감소했습니다. 원인 분석이 필요합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


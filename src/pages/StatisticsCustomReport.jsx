import { useState, useCallback, useMemo } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

// 리포트 템플릿
const reportTemplates = [
  { id: 1, name: '월간 정산 요약', description: '월별 정산 현황 종합 리포트', category: '정산' },
  { id: 2, name: '거래처별 분석', description: '거래처별 상세 분석 리포트', category: '거래처' },
  { id: 3, name: '항목별 비교', description: '정산 항목 간 비교 분석', category: '항목' },
  { id: 4, name: 'TOP 10 분석', description: '상위 10개 항목/거래처 분석', category: '랭킹' },
  { id: 5, name: '트렌드 예측', description: '향후 3개월 트렌드 예측', category: '예측' },
  { id: 6, name: '커스텀 리포트', description: '사용자 정의 리포트', category: '커스텀' },
]

// 샘플 데이터
const sampleChartData = [
  { name: '1월', value: 142234567 },
  { name: '2월', value: 148234567 },
  { name: '3월', value: 156234567 },
  { name: '4월', value: 163456789 },
  { name: '5월', value: 158234567 },
  { name: '6월', value: 171234567 },
]

const categoryData = [
  { name: 'B2C 작업비', value: 94098050, percent: 52.18 },
  { name: '부자재', value: 44185170, percent: 24.51 },
  { name: '가공비', value: 20700000, percent: 11.48 },
  { name: '보관비', value: 3965833, percent: 2.20 },
  { name: '기타', value: 17322020, percent: 9.63 },
]

export default function StatisticsCustomReport() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [reportConfig, setReportConfig] = useState({
    title: '',
    period: 'monthly',
    startDate: '',
    endDate: '',
    includeChart: true,
    includeTable: true,
    chartType: 'bar',
    groupBy: 'category',
    filters: {
      category: [],
      client: [],
      minAmount: '',
      maxAmount: '',
    }
  })
  const [previewMode, setPreviewMode] = useState(false)

  // formatCurrency를 useCallback으로 메모이제이션
  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(value)
  }, [])

  // 핸들러 함수들을 useCallback으로 메모이제이션
  const handleTemplateSelect = useCallback((template) => {
    setSelectedTemplate(template)
    setReportConfig(prev => ({
      ...prev,
      title: template.name,
    }))
  }, [])

  const handleGenerateReport = useCallback(() => {
    setPreviewMode(true)
  }, [])

  const handleExport = useCallback((format) => {
    alert(`${format} 형식으로 리포트를 다운로드합니다.`)
  }, [])

  const handleConfigChange = useCallback((field, value) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleFilterChange = useCallback((filterField, value) => {
    setReportConfig(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterField]: value
      }
    }))
  }, [])

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽: 리포트 설정 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 템플릿 선택 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 리포트 템플릿</h3>
            <div className="space-y-2">
              {reportTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-900">{template.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                  <div className="text-xs text-blue-600 mt-1">#{template.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 리포트 설정 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ 리포트 설정</h3>
            
            <div className="space-y-4">
              {/* 리포트 제목 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">리포트 제목</label>
                <input
                  type="text"
                  value={reportConfig.title}
                  onChange={(e) => handleConfigChange('title', e.target.value)}
                  placeholder="리포트 제목을 입력하세요"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              {/* 기간 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기간</label>
                <select 
                  value={reportConfig.period}
                  onChange={(e) => handleConfigChange('period', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="daily">일별</option>
                  <option value="weekly">주별</option>
                  <option value="monthly">월별</option>
                  <option value="quarterly">분기별</option>
                  <option value="yearly">연도별</option>
                  <option value="custom">사용자 지정</option>
                </select>
              </div>

              {/* 날짜 범위 */}
              {reportConfig.period === 'custom' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
                    <input
                      type="date"
                      value={reportConfig.startDate}
                      onChange={(e) => handleConfigChange('startDate', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
                    <input
                      type="date"
                      value={reportConfig.endDate}
                      onChange={(e) => handleConfigChange('endDate', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* 그룹화 기준 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">그룹화 기준</label>
                <select 
                  value={reportConfig.groupBy}
                  onChange={(e) => handleConfigChange('groupBy', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="category">카테고리별</option>
                  <option value="client">거래처별</option>
                  <option value="item">항목별</option>
                  <option value="date">날짜별</option>
                </select>
              </div>

              {/* 차트 타입 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">차트 타입</label>
                <select 
                  value={reportConfig.chartType}
                  onChange={(e) => handleConfigChange('chartType', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="bar">막대 차트</option>
                  <option value="line">라인 차트</option>
                  <option value="pie">원형 차트</option>
                  <option value="area">영역 차트</option>
                </select>
              </div>

              {/* 포함 요소 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">포함 요소</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeChart}
                      onChange={(e) => handleConfigChange('includeChart', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">차트 포함</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeTable}
                      onChange={(e) => handleConfigChange('includeTable', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">테이블 포함</span>
                  </label>
                </div>
              </div>

              {/* 금액 필터 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">금액 범위</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="최소"
                    value={reportConfig.filters.minAmount}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="최대"
                    value={reportConfig.filters.maxAmount}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="mt-6 space-y-2">
              <button
                onClick={handleGenerateReport}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                🔍 미리보기
              </button>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleExport('PDF')}
                  className="bg-red-600 text-white px-3 py-2 rounded-md text-xs hover:bg-red-700"
                >
                  📄 PDF
                </button>
                <button
                  onClick={() => handleExport('Excel')}
                  className="bg-green-600 text-white px-3 py-2 rounded-md text-xs hover:bg-green-700"
                >
                  📊 Excel
                </button>
                <button
                  onClick={() => handleExport('CSV')}
                  className="bg-gray-600 text-white px-3 py-2 rounded-md text-xs hover:bg-gray-700"
                >
                  📋 CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 리포트 미리보기 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* 리포트 헤더 */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {reportConfig.title || '리포트 미리보기'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    생성일: {new Date().toLocaleDateString('ko-KR')} | 
                    기간: {reportConfig.period === 'monthly' ? '월별' : reportConfig.period}
                  </p>
                </div>
                {previewMode && (
                  <button
                    onClick={() => setPreviewMode(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 리포트 본문 */}
            <div className="p-6">
              {!previewMode ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-500 text-lg">
                    왼쪽에서 템플릿을 선택하고<br />
                    설정을 완료한 후 미리보기 버튼을 클릭하세요
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 요약 카드 */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-sm text-blue-700 mb-1">총 정산액</div>
                      <div className="text-2xl font-bold text-blue-900">180.3억원</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-sm text-green-700 mb-1">항목 수</div>
                      <div className="text-2xl font-bold text-green-900">9개</div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="text-sm text-orange-700 mb-1">평균</div>
                      <div className="text-2xl font-bold text-orange-900">20.0억원</div>
                    </div>
                  </div>

                  {/* 차트 */}
                  {reportConfig.includeChart && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {reportConfig.chartType === 'pie' ? '항목별 구성비' : '정산 추이'}
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        {reportConfig.chartType === 'bar' ? (
                          <BarChart data={sampleChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" fontSize={12} />
                            <YAxis fontSize={12} />
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                            <Bar dataKey="value" fill="#3b82f6" />
                          </BarChart>
                        ) : reportConfig.chartType === 'line' ? (
                          <LineChart data={sampleChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" fontSize={12} />
                            <YAxis fontSize={12} />
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                          </LineChart>
                        ) : (
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${percent}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                          </PieChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* 테이블 */}
                  {reportConfig.includeTable && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              항목
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              금액
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              구성비
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {categoryData.map((item, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                              <td className="px-4 py-3 text-sm text-right text-gray-900">
                                {formatCurrency(item.value)}
                              </td>
                              <td className="px-4 py-3 text-sm text-right text-gray-600">
                                {item.percent}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* 리포트 하단 */}
                  <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
                    <p>본 리포트는 KREAM ERP 시스템에서 자동으로 생성되었습니다.</p>
                    <p className="mt-1">문의: admin@kream.co.kr</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 저장된 리포트 */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💾 저장된 리포트</h3>
            <div className="space-y-2">
              {[
                { name: '9월 월간 정산 요약', date: '2024-09-30', size: '2.4MB' },
                { name: '3분기 거래처별 분석', date: '2024-09-28', size: '1.8MB' },
                { name: '8월 TOP 10 분석', date: '2024-08-31', size: '1.2MB' },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📄</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      <div className="text-xs text-gray-500">{report.date} · {report.size}</div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    다운로드
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


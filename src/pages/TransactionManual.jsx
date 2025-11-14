import { useState, useEffect } from 'react'

export default function TransactionManual() {
  const [filters, setFilters] = useState({
    purchaseRoute: '',
    salesChannel: '',
    apiId: '',
    startDate: '',
    endDate: ''
  })
  const [activePeriod, setActivePeriod] = useState('thismonth')
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false)

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
      purchaseRoute: '',
      salesChannel: '',
      apiId: '',
      startDate: '',
      endDate: ''
    })
    setActivePeriod('')
  }

  const handleSearch = () => {
    console.log('검색 조건:', filters)
    // 검색 API 호출
  }

  const handleExcelDownload = () => {
    console.log('엑셀 다운로드')
    // 엑셀 다운로드 로직
  }

  return (
    <div className="space-y-6">
      {/* 검색 필터 바 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form className="flex flex-nowrap items-center gap-4" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          {/* 매입 경로 Select */}
          <div className="floating-wrapper w-40 flex-shrink-0">
            <select 
              id="purchaseRoute" 
              className={`floating-input ${filters.purchaseRoute ? 'has-value' : ''}`}
              value={filters.purchaseRoute}
              onChange={(e) => setFilters({...filters, purchaseRoute: e.target.value})}
            >
              <option value="" disabled></option>
              <option value="import">Import</option>
              <option value="order">Order</option>
              <option value="direct">Direct</option>
            </select>
            <label className="floating-label">매입 경로</label>
            {filters.purchaseRoute && (
              <span 
                className="select-clear" 
                onClick={() => setFilters({...filters, purchaseRoute: ''})}
              ></span>
            )}
          </div>

          {/* 판매처 Select */}
          <div className="floating-wrapper w-40 flex-shrink-0">
            <select 
              id="salesChannel" 
              className={`floating-input ${filters.salesChannel ? 'has-value' : ''}`}
              value={filters.salesChannel}
              onChange={(e) => setFilters({...filters, salesChannel: e.target.value})}
            >
              <option value="" disabled></option>
              <option value="kream">KREAM</option>
              <option value="naver">Naver</option>
              <option value="kakao">Kakao</option>
            </select>
            <label className="floating-label">판매처</label>
            {filters.salesChannel && (
              <span 
                className="select-clear" 
                onClick={() => setFilters({...filters, salesChannel: ''})}
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
              <option value="AP0001">AP0001</option>
              <option value="AP0002">AP0002</option>
              <option value="AP0003">AP0003</option>
            </select>
            <label className="floating-label">API ID</label>
            {filters.apiId && (
              <span 
                className="select-clear" 
                onClick={() => setFilters({...filters, apiId: ''})}
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
              검색
            </button>
            <button
              type="button"
              onClick={handleExcelDownload}
              className="action-btn btn-reset"
            >
              엑셀 다운로드
            </button>
            <button
              type="button"
              onClick={() => setShowBulkUploadModal(true)}
              className="action-btn"
              style={{ background: '#10B981', color: 'white', border: 'none' }}
            >
              대량 등록
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .floating-wrapper{position:relative;display:inline-block}
        .floating-input{width:100%;height:44px;padding:12px 12px 4px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;color:#111827;background:#fff;transition:all .2s}
        select.floating-input{padding-right:36px;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right 10px center;background-size:1.5em;appearance:none;-webkit-appearance:none;-moz-appearance:none}
        select.floating-input::-ms-expand{display:none}
        select.floating-input option{padding:8px 12px;border:1px solid #E5E7EB}
        select.floating-input.has-value{padding-right:60px}
        .floating-input:focus{outline:none;border-color:#3B82F6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
        .select-clear{position:absolute;right:32px;top:50%;transform:translateY(-50%);width:18px;height:18px;background:#9CA3AF;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s}
        .select-clear:hover{background:#6B7280}
        .select-clear::before,.select-clear::after{content:'';position:absolute;width:10px;height:2px;background:#fff}
        .select-clear::before{transform:rotate(45deg)}
        .select-clear::after{transform:rotate(-45deg)}
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
        .btn-reset{background:#fff;border:1px solid #D1D5DB;color:#6B7280}
        .btn-reset:hover{background:#F9FAFB;border-color:#9CA3AF}
        .btn-submit{background:#3B82F6;border:none;color:#fff}
        .btn-submit:hover{background:#2563EB}
      `}</style>


      {/* 데이터 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">거래일자</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">매입경로</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">판매처</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">API ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">상품명</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">수량</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">매입가</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">판매가</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">수수료</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">정산금액</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">상태</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td colSpan="13" className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500 mb-1">조회된 데이터가 없습니다</p>
                    <p className="text-xs text-gray-400">검색 조건을 입력하거나 대량 등록을 이용해주세요</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 대량 등록 모달 */}
      {showBulkUploadModal && (
        <BulkUploadModal onClose={() => setShowBulkUploadModal(false)} />
      )}
    </div>
  )
}

// 대량 등록 모달 컴포넌트
function BulkUploadModal({ onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)

  const categories = [
    '생품명 선택',
    '국내 C2C 거래',
    '해외 CBT 거래',
    '국내외 WMS 거래',
    '기타 거래'
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ]
    
    const maxSize = 5 * 1024 * 1024

    if (!allowedTypes.includes(file.type)) {
      alert('허용되지 않는 파일 형식입니다. .xlsx, .xls, .csv 파일만 업로드 가능합니다.')
      return
    }

    if (file.size > maxSize) {
      alert('파일 크기가 5MB를 초과합니다.')
      return
    }

    setUploadedFile(file)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  const handleUpload = () => {
    if (!selectedCategory) {
      alert('대분류를 선택해주세요.')
      return
    }
    if (!uploadedFile) {
      alert('파일을 선택해주세요.')
      return
    }
    
    console.log('업로드 처리:', { category: selectedCategory, file: uploadedFile })
    alert('파일이 업로드되었습니다.')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">거래 내역 대량 등록</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="p-6 space-y-6">
          {/* 대분류 선택 */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              대분류 선택 <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category === '생품명 선택' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* 파일 업로드 */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              파일 업로드 <span className="text-red-500">*</span>
            </label>
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              <input
                type="file"
                id="file-upload-modal"
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileInput}
              />

              {!uploadedFile ? (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-3"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    파일을 여기에 드래그하거나 클릭하여 선택하세요
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    .xlsx, .xls, .csv 파일 / 최대 5MB
                  </p>
                  <label
                    htmlFor="file-upload-modal"
                    className="inline-flex items-center px-4 py-2 border border-gray-900 rounded-lg text-sm font-medium text-gray-900 bg-white hover:bg-gray-900 hover:text-white transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    파일 선택
                  </label>
                </>
              ) : (
                <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-semibold text-gray-900 truncate">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="flex-shrink-0 ml-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <p className="mt-2 text-xs text-gray-500">
              ※ 대량 파일 업로드 시 .xlsx, .xls, .csv / 최대 용량: 5MB
            </p>
          </div>

          {/* 템플릿 다운로드 안내 */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900 mb-1">엑셀 템플릿 다운로드</p>
                <p className="text-xs text-blue-700 mb-3">
                  업로드하실 파일의 형식이 맞지 않으면 오류가 발생할 수 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-white border border-blue-300 rounded text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors">
                    📄 국내 C2C 템플릿
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-blue-300 rounded text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors">
                    📄 해외 CBT 템플릿
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-blue-300 rounded text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors">
                    📄 WMS 템플릿
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  )
}

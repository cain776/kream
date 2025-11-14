import { useState } from 'react'
import { SearchButton, ResetButton, AddButton, DownloadButton, EditButton, DeleteButton } from '../components/Button'

export default function MasterDeliveryCode() {
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceType, setServiceType] = useState('all')

  const dummyData = [
    { id: 1, deliveryCode: 'D001', deliveryName: 'CJ대한통운', serviceType: '국내', trackingUrl: 'https://www.cjlogistics.com/tracking', apiKey: 'CJ-API-12345', contact: '1588-1255', deliveryTime: '익일배송', cost: 3000, status: '활성', createdAt: '2024-01-05', updatedAt: '2024-11-10' },
    { id: 2, deliveryCode: 'D002', deliveryName: '한진택배', serviceType: '국내', trackingUrl: 'https://www.hanjin.co.kr/tracking', apiKey: 'HJ-API-67890', contact: '1588-0011', deliveryTime: '당일/익일', cost: 2800, status: '활성', createdAt: '2024-01-05', updatedAt: '2024-10-25' },
    { id: 3, deliveryCode: 'D003', deliveryName: 'DHL', serviceType: '국제', trackingUrl: 'https://www.dhl.com/tracking', apiKey: 'DHL-API-ABCDE', contact: '1588-0001', deliveryTime: '3-5일', cost: 25000, status: '활성', createdAt: '2024-02-01', updatedAt: '2024-11-08' },
    { id: 4, deliveryCode: 'D004', deliveryName: '우체국택배', serviceType: '국내', trackingUrl: 'https://service.epost.go.kr/tracking', apiKey: 'POST-API-99999', contact: '1588-1300', deliveryTime: '2-3일', cost: 2500, status: '비활성', createdAt: '2024-03-10', updatedAt: '2024-09-15' },
  ]

  const handleSearch = () => {
    console.log('검색:', searchTerm, serviceType)
  }

  return (
    <div className="space-y-6">
      {/* 검색 필터 영역 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-3">
              <label className="block text-xs text-gray-600 mb-2">검색어</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="택배사명, 코드 검색"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-600 mb-2">서비스 유형</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체</option>
                <option value="domestic">국내</option>
                <option value="international">국제</option>
              </select>
            </div>
            <div className="col-span-7 flex gap-2 justify-end">
              <SearchButton onClick={handleSearch} />
              <ResetButton />
            </div>
          </div>
        </div>
      </div>

      {/* 데이터 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            총 <span className="font-semibold text-gray-900">{dummyData.length}</span>건
          </div>
          <div className="flex gap-2">
            <AddButton />
            <DownloadButton />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">택배사 코드</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">택배사명</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">서비스 유형</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">추적 URL</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">API Key</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">연락처</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">배송시간</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">배송비</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">상태</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">등록일</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {dummyData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono font-medium text-blue-600">{item.deliveryCode}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">{item.deliveryName}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.serviceType === '국내' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {item.serviceType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <a 
                      href={item.trackingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 hover:underline truncate block max-w-xs"
                      title={item.trackingUrl}
                    >
                      {item.trackingUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-gray-600">{item.apiKey}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{item.contact}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-gray-600">{item.deliveryTime}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-medium text-gray-900">{item.cost.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === '활성' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-gray-500">{item.createdAt}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <EditButton />
                      <DeleteButton />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


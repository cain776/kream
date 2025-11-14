import { useState } from 'react'
import { SearchButton, ResetButton, AddButton, DownloadButton, EditButton, DeleteButton } from '../components/Button'

export default function MasterClientCode() {
  const [searchTerm, setSearchTerm] = useState('')
  const [clientType, setClientType] = useState('all')

  const dummyData = [
    { id: 1, clientCode: 'C001', clientName: 'KREAM 본사', clientType: '내부', businessNumber: '123-45-67890', ceo: '김대표', contact: '02-1234-5678', email: 'contact@kream.co.kr', address: '서울시 강남구', status: '활성', createdAt: '2024-01-05', updatedAt: '2024-11-12' },
    { id: 2, clientCode: 'C002', clientName: 'ABC 물류센터', clientType: '외부', businessNumber: '234-56-78901', ceo: '이대표', contact: '031-5678-1234', email: 'abc@logistics.com', address: '경기도 이천시', status: '활성', createdAt: '2024-02-10', updatedAt: '2024-10-30' },
    { id: 3, clientCode: 'C003', clientName: 'XYZ 유통', clientType: '외부', businessNumber: '345-67-89012', ceo: '박대표', contact: '02-9876-5432', email: 'xyz@trade.com', address: '서울시 송파구', status: '비활성', createdAt: '2024-03-15', updatedAt: '2024-09-25' },
  ]

  const handleSearch = () => {
    console.log('검색:', searchTerm, clientType)
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
                placeholder="고객사명, 코드, 사업자번호 검색"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-600 mb-2">고객사 유형</label>
              <select
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체</option>
                <option value="internal">내부</option>
                <option value="external">외부</option>
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">고객사 코드</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">고객사명</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">유형</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">사업자번호</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">대표자</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">연락처</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">이메일</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">주소</th>
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
                    <span className="text-sm font-mono font-medium text-blue-600">{item.clientCode}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">{item.clientName}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.clientType === '내부' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.clientType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-gray-600">{item.businessNumber}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">{item.ceo}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{item.contact}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{item.email}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{item.address}</span>
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


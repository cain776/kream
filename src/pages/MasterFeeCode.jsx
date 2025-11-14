import { useState } from 'react'
import { SearchButton, ResetButton, AddButton, DownloadButton, EditButton, DeleteButton } from '../components/Button'

export default function MasterFeeCode() {
  const [searchTerm, setSearchTerm] = useState('')
  const [feeType, setFeeType] = useState('all')

  const dummyData = [
    { id: 1, feeCode: 'F001', feeName: '판매수수료', feeType: '정률', feeRate: '10%', feeAmount: null, applyTarget: '전체 상품', status: '활성', createdAt: '2024-01-10', updatedAt: '2024-11-01' },
    { id: 2, feeCode: 'F002', feeName: '배송비', feeType: '정액', feeRate: null, feeAmount: 3000, applyTarget: '국내 배송', status: '활성', createdAt: '2024-01-10', updatedAt: '2024-10-15' },
    { id: 3, feeCode: 'F003', feeName: 'VIP 판매수수료', feeType: '정률', feeRate: '5%', feeAmount: null, applyTarget: 'VIP 셀러', status: '활성', createdAt: '2024-02-01', updatedAt: '2024-11-10' },
    { id: 4, feeCode: 'F004', feeName: '해외 배송비', feeType: '정액', feeRate: null, feeAmount: 15000, applyTarget: '해외 배송', status: '비활성', createdAt: '2024-03-05', updatedAt: '2024-09-20' },
  ]

  const handleSearch = () => {
    console.log('검색:', searchTerm, feeType)
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
                placeholder="수수료명, 코드 검색"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-600 mb-2">수수료 유형</label>
              <select
                value={feeType}
                onChange={(e) => setFeeType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체</option>
                <option value="rate">정률</option>
                <option value="fixed">정액</option>
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">수수료 코드</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">수수료명</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">유형</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">수수료율</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">수수료액</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">적용 대상</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">상태</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">등록일</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">수정일</th>
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
                    <span className="text-sm font-mono font-medium text-blue-600">{item.feeCode}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">{item.feeName}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.feeType === '정률' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.feeType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-gray-900">{item.feeRate || '-'}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-gray-900">
                      {item.feeAmount ? `${item.feeAmount.toLocaleString()}` : '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-gray-600">{item.applyTarget}</span>
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
                    <span className="text-xs text-gray-500">{item.updatedAt}</span>
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


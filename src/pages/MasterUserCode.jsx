import { useState } from 'react'
import { SearchButton, ResetButton, AddButton, DownloadButton, EditButton, DeleteButton } from '../components/Button'

export default function MasterUserCode() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const dummyData = [
    { id: 1, userCode: 'U001', userName: '김철수', email: 'kim@kream.co.kr', role: '관리자', department: '정산팀', status: '활성', createdAt: '2024-01-15', updatedAt: '2024-11-10' },
    { id: 2, userCode: 'U002', userName: '이영희', email: 'lee@kream.co.kr', role: '운영자', department: '운영팀', status: '활성', createdAt: '2024-02-20', updatedAt: '2024-11-05' },
    { id: 3, userCode: 'U003', userName: '박민수', email: 'park@kream.co.kr', role: '사용자', department: 'CS팀', status: '비활성', createdAt: '2024-03-10', updatedAt: '2024-10-20' },
  ]

  const handleSearch = () => {
    console.log('검색:', searchTerm, statusFilter)
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
                placeholder="사용자명, 이메일, 코드 검색"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-600 mb-2">상태</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체</option>
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">사용자 코드</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">사용자명</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">이메일</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">권한</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">부서</th>
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
                    <span className="text-sm font-mono font-medium text-blue-600">{item.userCode}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">{item.userName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{item.email}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.role === '관리자' ? 'bg-purple-100 text-purple-700' :
                      item.role === '운영자' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-gray-600">{item.department}</span>
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


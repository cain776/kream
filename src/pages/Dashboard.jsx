export default function Dashboard() {
  return (
    <div>
      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: '정산 대상', value: '1,234', unit: '건', change: '+15.3%', isPositive: true },
          { label: '정산 금액', value: '5.2', unit: '억원', change: '+8.7%', isPositive: true },
          { label: '판매자 수', value: '45', unit: '명', change: '0%', isPositive: null },
          { label: '보류 건', value: '12', unit: '건', change: '-25.0%', isPositive: false },
        ].map((card, idx) => (
          <div key={idx} className="card-hover">
            <div className="text-sm text-kream-gray-600 mb-2">{card.label}</div>
            <div className="text-4xl font-bold mb-2">
              {card.value}<span className="text-xl ml-1">{card.unit}</span>
            </div>
            <div className={`text-xs ${card.isPositive === true ? 'text-success' : card.isPositive === false ? 'text-danger' : 'text-kream-gray-500'}`}>
              {card.change} 전일 대비
            </div>
          </div>
        ))}
      </div>

      {/* 주요 기능 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold mb-4">빠른 작업</h2>
          <div className="space-y-2">
            <button className="btn btn-primary w-full">정산서 생성</button>
            <button className="btn btn-secondary w-full">대사 실행</button>
            <button className="btn btn-secondary w-full">승인 대기 확인</button>
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-bold mb-4">최근 알림</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-warning">⚠️</span>
              <div>
                <p className="font-medium">정산 보류 발생</p>
                <p className="text-kream-gray-600 text-xs">판매자 "김철수" - 계좌 오류</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-success">✅</span>
              <div>
                <p className="font-medium">정산서 승인 완료</p>
                <p className="text-kream-gray-600 text-xs">STMT-20250115-001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


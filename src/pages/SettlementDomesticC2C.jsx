import { useState, useEffect } from 'react'

export default function SettlementDomesticC2C() {
  const [selectedItems, setSelectedItems] = useState([])
  const [activeView, setActiveView] = useState('order') // 기본값을 'order'로 변경
  const [selectedSeller, setSelectedSeller] = useState(null) // 주문 뷰에서 선택된 셀러
  const [quickFilters, setQuickFilters] = useState({
    onlyPending: false,
    onlyHold: false,
    onlyFailed: false
  })
  const [itemsPerPage, setItemsPerPage] = useState(10) // 페이지당 표시 개수
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  
  // 검색 필터 상태
  const [searchFilters, setSearchFilters] = useState({
    sellerType: '',
    settlementStatus: '',
    startDate: '',
    endDate: ''
  })
  const [activePeriod, setActivePeriod] = useState('thismonth')

  // 더미 데이터 - 셀러 집계
  const settlementData = [
    {
      id: 'S001',
      seller_id: 'seller001',
      seller_name: '김철수',
      seller_type: '개인',
      total_count: 125,
      normal_count: 122,
      hold_count: 3,
      inspection_pass: 120,
      inspection_fail: 5,
      storage_count: 45,
      avg_inspection_time: '2.5시간',
      total_amount: 5240000,
      fee: 524000,
      fee_type: '판매수수료 10%',
      net_amount: 4716000,
      status: 'pending',
      period: '2025.01.01 ~ 2025.01.15',
      due_date: '2025.01.20'
    },
    {
      id: 'S002',
      seller_id: 'seller002',
      seller_name: '이영희',
      seller_type: '셀러',
      total_count: 89,
      normal_count: 89,
      hold_count: 0,
      inspection_pass: 87,
      inspection_fail: 2,
      storage_count: 23,
      avg_inspection_time: '1.8시간',
      total_amount: 3150000,
      fee: 315000,
      fee_type: '판매수수료 10%',
      net_amount: 2835000,
      status: 'completed',
      period: '2025.01.01 ~ 2025.01.15',
      due_date: '2025.01.20'
    },
    {
      id: 'S003',
      seller_id: 'seller003',
      seller_name: '박민수',
      seller_type: '법인',
      total_count: 203,
      normal_count: 195,
      hold_count: 8,
      inspection_pass: 198,
      inspection_fail: 5,
      storage_count: 67,
      avg_inspection_time: '3.2시간',
      total_amount: 8950000,
      fee: 895000,
      fee_type: '판매수수료 10%',
      net_amount: 8055000,
      status: 'cancelled',
      period: '2025.01.01 ~ 2025.01.15',
      due_date: '2025.01.20'
    }
  ]

  // 더미 데이터 - 주문 상세 (20개)
  const orderData = [
    {
      id: 'O12501',
      order_number: '#12501',
      seller_id: 'seller001',
      seller_name: '김철수',
      seller_type: '개인',
      product_name: 'Nike Air Jordan 1 Retro High',
      product_size: '280',
      order_date: '2025-01-15',
      payment_date: '2025-01-15 14:23',
      order_status: '검수중',
      inspection_status: '검수대기',
      quantity: 1,
      product_price: 250000,
      fee: 25000,
      fee_type: '판매수수료 10%',
      net_amount: 225000,
      delivery_fee: 3000,
      buyer_name: '홍길동'
    },
    {
      id: 'O12502',
      order_number: '#12502',
      seller_id: 'seller001',
      seller_name: '김철수',
      seller_type: '개인',
      product_name: 'Adidas Yeezy Boost 350 V2',
      product_size: '275',
      order_date: '2025-01-15',
      payment_date: '2025-01-15 16:45',
      order_status: '검수합격',
      inspection_status: '합격',
      quantity: 1,
      product_price: 380000,
      fee: 38000,
      fee_type: '판매수수료 10%',
      net_amount: 342000,
      delivery_fee: 3000,
      buyer_name: '김영수'
    },
    {
      id: 'O12503',
      order_number: '#12503',
      seller_id: 'seller001',
      seller_name: '김철수',
      seller_type: '개인',
      product_name: 'Nike Dunk Low Panda',
      product_size: '270',
      order_date: '2025-01-14',
      payment_date: '2025-01-14 09:12',
      order_status: '배송중',
      inspection_status: '합격',
      quantity: 1,
      product_price: 190000,
      fee: 19000,
      fee_type: '판매수수료 10%',
      net_amount: 171000,
      delivery_fee: 3000,
      buyer_name: '이민호'
    },
    {
      id: 'O12504',
      order_number: '#12504',
      seller_id: 'seller002',
      seller_name: '이영희',
      seller_type: '셀러',
      product_name: 'New Balance 550',
      product_size: '265',
      order_date: '2025-01-15',
      payment_date: '2025-01-15 11:30',
      order_status: '검수합격',
      inspection_status: '합격',
      quantity: 1,
      product_price: 160000,
      fee: 16000,
      fee_type: '판매수수료 10%',
      net_amount: 144000,
      delivery_fee: 3000,
      buyer_name: '박지성'
    },
    {
      id: 'O12505',
      order_number: '#12505',
      seller_id: 'seller003',
      seller_name: '박민수',
      seller_type: '법인',
      product_name: 'Converse Chuck 70 High',
      product_size: '280',
      order_date: '2025-01-14',
      payment_date: '2025-01-14 15:22',
      order_status: '검수불합격',
      inspection_status: '불합격',
      quantity: 1,
      product_price: 120000,
      fee: 12000,
      fee_type: '판매수수료 10%',
      net_amount: 108000,
      delivery_fee: 3000,
      buyer_name: '최수진'
    },
    {
      id: 'O12506',
      order_number: '#12506',
      seller_id: 'seller001',
      seller_name: '김철수',
      seller_type: '개인',
      product_name: 'Adidas Samba OG',
      product_size: '270',
      order_date: '2025-01-14',
      payment_date: '2025-01-14 10:15',
      order_status: '배송완료',
      inspection_status: '합격',
      quantity: 1,
      product_price: 145000,
      fee: 14500,
      fee_type: '판매수수료 10%',
      net_amount: 130500,
      delivery_fee: 3000,
      buyer_name: '정우성'
    },
    {
      id: 'O12507',
      order_number: '#12507',
      seller_id: 'seller002',
      seller_name: '이영희',
      seller_type: '셀러',
      product_name: 'Nike Air Force 1',
      product_size: '275',
      order_date: '2025-01-13',
      payment_date: '2025-01-13 14:50',
      order_status: '검수중',
      inspection_status: '검수대기',
      quantity: 1,
      product_price: 135000,
      fee: 13500,
      fee_type: '판매수수료 10%',
      net_amount: 121500,
      delivery_fee: 3000,
      buyer_name: '강호동'
    },
    {
      id: 'O12508',
      order_number: '#12508',
      seller_id: 'seller003',
      seller_name: '박민수',
      seller_type: '법인',
      product_name: 'Vans Old Skool',
      product_size: '265',
      order_date: '2025-01-13',
      payment_date: '2025-01-13 11:20',
      order_status: '검수합격',
      inspection_status: '합격',
      quantity: 1,
      product_price: 89000,
      fee: 8900,
      fee_type: '판매수수료 10%',
      net_amount: 80100,
      delivery_fee: 3000,
      buyer_name: '유재석'
    },
    {
      id: 'O12509',
      order_number: '#12509',
      seller_id: 'seller001',
      seller_name: '김철수',
      seller_type: '개인',
      product_name: 'Puma Suede Classic',
      product_size: '280',
      order_date: '2025-01-12',
      payment_date: '2025-01-12 16:30',
      order_status: '배송중',
      inspection_status: '합격',
      quantity: 1,
      product_price: 95000,
      fee: 9500,
      fee_type: '판매수수료 10%',
      net_amount: 85500,
      delivery_fee: 3000,
      buyer_name: '이광수'
    },
    {
      id: 'O12510',
      order_number: '#12510',
      seller_id: 'seller002',
      seller_name: '이영희',
      seller_type: '셀러',
      product_name: 'Reebok Club C',
      product_size: '270',
      order_date: '2025-01-12',
      payment_date: '2025-01-12 13:45',
      order_status: '검수합격',
      inspection_status: '합격',
      quantity: 1,
      product_price: 110000,
      fee: 11000,
      fee_type: '판매수수료 10%',
      net_amount: 99000,
      delivery_fee: 3000,
      buyer_name: '송지효'
    },
    {
      id: 'O12511',
      order_number: '#12511',
      seller_id: 'seller003',
      seller_name: '박민수',
      seller_type: '법인',
      product_name: 'ASICS Gel-Lyte III',
      product_size: '275',
      order_date: '2025-01-11',
      payment_date: '2025-01-11 15:10',
      order_status: '배송완료',
      inspection_status: '합격',
      quantity: 1,
      product_price: 155000,
      fee: 15500,
      fee_type: '판매수수료 10%',
      net_amount: 139500,
      delivery_fee: 3000,
      buyer_name: '김종국'
    },
    {
      id: 'O12512',
      order_number: '#12512',
      seller_id: 'seller001',
      seller_name: '김철수',
      seller_type: '개인',
      product_name: 'Salomon XT-6',
      product_size: '280',
      order_date: '2025-01-11',
      payment_date: '2025-01-11 10:25',
      order_status: '검수중',
      inspection_status: '검수대기',
      quantity: 1,
      product_price: 220000,
      fee: 22000,
      fee_type: '판매수수료 10%',
      net_amount: 198000,
      delivery_fee: 3000,
      buyer_name: '하하'
    },
    {
      id: 'O12513',
      order_number: '#12513',
      seller_id: 'seller002',
      seller_name: '이영희',
      seller_type: '셀러',
      product_name: 'Hoka One One Clifton',
      product_size: '265',
      order_date: '2025-01-10',
      payment_date: '2025-01-10 14:40',
      order_status: '검수합격',
      inspection_status: '합격',
      quantity: 1,
      product_price: 185000,
      fee: 18500,
      fee_type: '판매수수료 10%',
      net_amount: 166500,
      delivery_fee: 3000,
      buyer_name: '지석진'
    },
    {
      id: 'O12514',
      order_number: '#12514',
      seller_id: 'seller003',
      seller_name: '박민수',
      seller_type: '법인',
      product_name: 'On Cloud 5',
      product_size: '270',
      order_date: '2025-01-10',
      payment_date: '2025-01-10 11:55',
      order_status: '배송중',
      inspection_status: '합격',
      quantity: 1,
      product_price: 175000,
      fee: 17500,
      fee_type: '판매수수료 10%',
      net_amount: 157500,
      delivery_fee: 3000,
      buyer_name: '전소민'
    },
    {
      id: 'O12515',
      order_number: '#12515',
      seller_id: 'seller001',
      seller_name: '김철수',
      seller_type: '개인',
      product_name: 'Nike SB Dunk Low Pro',
      product_size: '275',
      order_date: '2025-01-09',
      payment_date: '2025-01-09 16:20',
      order_status: '검수불합격',
      inspection_status: '불합격',
      quantity: 1,
      product_price: 165000,
      fee: 16500,
      fee_type: '판매수수료 10%',
      net_amount: 148500,
      delivery_fee: 3000,
      buyer_name: '양세찬'
    },
    {
      id: 'O12516',
      order_number: '#12516',
      seller_id: 'seller002',
      seller_name: '이영희',
      seller_type: '셀러',
      product_name: 'Adidas Gazelle',
      product_size: '280',
      order_date: '2025-01-09',
      payment_date: '2025-01-09 13:35',
      order_status: '배송완료',
      inspection_status: '합격',
      quantity: 1,
      product_price: 125000,
      fee: 12500,
      fee_type: '판매수수료 10%',
      net_amount: 112500,
      delivery_fee: 3000,
      buyer_name: '김다미'
    },
    {
      id: 'O12517',
      order_number: '#12517',
      seller_id: 'seller003',
      seller_name: '박민수',
      seller_type: '법인',
      product_name: 'New Balance 990v5',
      product_size: '265',
      order_date: '2025-01-08',
      payment_date: '2025-01-08 15:50',
      order_status: '검수중',
      inspection_status: '검수대기',
      quantity: 1,
      product_price: 240000,
      fee: 24000,
      fee_type: '판매수수료 10%',
      net_amount: 216000,
      delivery_fee: 3000,
      buyer_name: '최우식'
    },
    {
      id: 'O12518',
      order_number: '#12518',
      seller_id: 'seller001',
      seller_name: '김철수',
      seller_type: '개인',
      product_name: 'Jordan 4 Retro',
      product_size: '270',
      order_date: '2025-01-08',
      payment_date: '2025-01-08 12:15',
      order_status: '검수합격',
      inspection_status: '합격',
      quantity: 1,
      product_price: 320000,
      fee: 32000,
      fee_type: '판매수수료 10%',
      net_amount: 288000,
      delivery_fee: 3000,
      buyer_name: '박서준'
    },
    {
      id: 'O12519',
      order_number: '#12519',
      seller_id: 'seller002',
      seller_name: '이영희',
      seller_type: '셀러',
      product_name: 'Adidas Ultra Boost',
      product_size: '275',
      order_date: '2025-01-07',
      payment_date: '2025-01-07 14:30',
      order_status: '배송중',
      inspection_status: '합격',
      quantity: 1,
      product_price: 210000,
      fee: 21000,
      fee_type: '판매수수료 10%',
      net_amount: 189000,
      delivery_fee: 3000,
      buyer_name: '이종석'
    },
    {
      id: 'O12520',
      order_number: '#12520',
      seller_id: 'seller003',
      seller_name: '박민수',
      seller_type: '법인',
      product_name: 'Nike React Infinity Run',
      product_size: '280',
      order_date: '2025-01-07',
      payment_date: '2025-01-07 11:45',
      order_status: '검수합격',
      inspection_status: '합격',
      quantity: 1,
      product_price: 180000,
      fee: 18000,
      fee_type: '판매수수료 10%',
      net_amount: 162000,
      delivery_fee: 3000,
      buyer_name: '공유'
    }
  ]

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(settlementData.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: '정산 대기', class: 'badge-pending' },
      completed: { label: '정산 완료', class: 'badge-completed' },
      cancelled: { label: '정산 취소', class: 'badge-hold' }
    }
    return statusMap[status] || { label: '알 수 없음', class: 'badge' }
  }

  const getSellerTypeBadge = (type) => {
    const typeMap = {
      '개인': { class: 'bg-blue-100 text-blue-700' },
      '셀러': { class: 'bg-green-100 text-green-700' },
      '법인': { class: 'bg-purple-100 text-purple-700' }
    }
    return typeMap[type] || { class: 'bg-gray-100 text-gray-700' }
  }

  const getOrderStatusBadge = (status) => {
    const statusMap = {
      '검수중': { class: 'bg-yellow-100 text-yellow-700' },
      '검수합격': { class: 'bg-green-100 text-green-700' },
      '검수불합격': { class: 'bg-red-100 text-red-700' },
      '배송중': { class: 'bg-blue-100 text-blue-700' },
      '배송완료': { class: 'bg-gray-100 text-gray-700' }
    }
    return statusMap[status] || { class: 'bg-gray-100 text-gray-700' }
  }

  const currentData = activeView === 'seller' ? settlementData : orderData
  const totalOrders = orderData.length

  // 필터링된 데이터
  const filteredSellerData = settlementData.filter(item => {
    if (quickFilters.onlyPending && item.status !== 'pending') return false
    if (quickFilters.onlyHold && item.hold_count === 0) return false
    return true
  })

  const filteredOrderData = orderData.filter(item => {
    if (selectedSeller && item.seller_id !== selectedSeller) return false
    if (quickFilters.onlyFailed && item.inspection_status !== '불합격') return false
    return true
  })

  const displayData = activeView === 'seller' ? filteredSellerData : filteredOrderData

  // 페이지네이션
  const totalPages = Math.ceil(displayData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = displayData.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

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

    setSearchFilters({
      ...searchFilters,
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
    
    setSearchFilters({
      sellerType: '',
      settlementStatus: '',
      startDate: formatDate(start),
      endDate: formatDate(end)
    })
    setActivePeriod('thismonth')
  }, [])

  // 검색 필터 초기화
  const handleResetFilters = () => {
    setSearchFilters({
      sellerType: '',
      settlementStatus: '',
      startDate: '',
      endDate: ''
    })
    setActivePeriod('')
  }

  // 검색 실행
  const handleSearch = () => {
    console.log('검색 조건:', searchFilters)
    // TODO: 실제 검색 로직 구현
  }

  // 동적 요약 정보 계산
  const summaryStats = activeView === 'seller' 
    ? {
        label1: '총 판매자',
        value1: `${filteredSellerData.length}명`,
        sub1: `거래 ${filteredSellerData.reduce((sum, item) => sum + item.total_count, 0)}건`,
        label2: '총 정산 금액',
        value2: `${Math.round(filteredSellerData.reduce((sum, item) => sum + item.net_amount, 0) / 1000)}천원`,
        sub2: '수수료 제외',
        label3: '검수 합격률',
        value3: (() => {
          const total = filteredSellerData.reduce((sum, item) => sum + item.inspection_pass + item.inspection_fail, 0)
          const pass = filteredSellerData.reduce((sum, item) => sum + item.inspection_pass, 0)
          return total > 0 ? `${((pass / total) * 100).toFixed(1)}%` : '0%'
        })(),
        sub3: (() => {
          const total = filteredSellerData.reduce((sum, item) => sum + item.inspection_pass + item.inspection_fail, 0)
          const pass = filteredSellerData.reduce((sum, item) => sum + item.inspection_pass, 0)
          return `${pass}건 / ${total}건`
        })(),
        label4: '보류 건수',
        value4: `${filteredSellerData.reduce((sum, item) => sum + item.hold_count, 0)}건`,
        sub4: '즉시 확인 필요'
      }
    : {
        label1: '총 주문 건수',
        value1: `${filteredOrderData.length}건`,
        sub1: selectedSeller ? `${filteredOrderData[0]?.seller_name || '선택'}의 주문` : '전체 주문',
        label2: '총 판매 금액',
        value2: `${Math.round(filteredOrderData.reduce((sum, item) => sum + item.product_price, 0) / 1000)}천원`,
        sub2: '수수료 포함',
        label3: '검수 합격',
        value3: `${filteredOrderData.filter(item => item.inspection_status === '합격').length}건`,
        sub3: `전체의 ${((filteredOrderData.filter(item => item.inspection_status === '합격').length / filteredOrderData.length) * 100).toFixed(1)}%`,
        label4: '검수 불합격',
        value4: `${filteredOrderData.filter(item => item.inspection_status === '불합격').length}건`,
        sub4: 'CS 대응 필요'
      }

  return (
    <div className="space-y-6">
      {/* 뷰 선택 탭 - 마진 조정, 순서 변경 */}
      <div className="border-b border-gray-200 -mx-8 px-8">
        <div className="flex items-center gap-0">
          <button
            onClick={() => {
              setActiveView('order')
              setQuickFilters({ onlyPending: false, onlyHold: false, onlyFailed: false })
            }}
            className={`relative px-8 py-4 text-sm font-semibold transition-all ${
              activeView === 'order'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>주문 상세</span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                activeView === 'order'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {filteredOrderData.length}
              </span>
            </div>
            {activeView === 'order' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => {
              setActiveView('seller')
              setSelectedSeller(null)
              setQuickFilters({ onlyPending: false, onlyHold: false, onlyFailed: false })
            }}
            className={`relative px-8 py-4 text-sm font-semibold transition-all ${
              activeView === 'seller'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>셀러별 집계</span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                activeView === 'seller'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {filteredSellerData.length}
              </span>
            </div>
            {activeView === 'seller' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* 검색 필터 바 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form className="flex flex-nowrap items-center gap-4" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          {/* 판매자 구분 Select */}
          <div className="floating-wrapper w-40 flex-shrink-0">
            <select 
              id="sellerType" 
              className={`floating-input ${searchFilters.sellerType ? 'has-value' : ''}`}
              value={searchFilters.sellerType}
              onChange={(e) => setSearchFilters({...searchFilters, sellerType: e.target.value})}
            >
              <option value="" disabled></option>
              <option value="개인">개인</option>
              <option value="셀러">셀러</option>
              <option value="법인">법인</option>
            </select>
            <label className="floating-label">판매자 구분</label>
            {searchFilters.sellerType && (
              <span 
                className="select-clear" 
                onClick={() => setSearchFilters({...searchFilters, sellerType: ''})}
              ></span>
            )}
          </div>

          {/* 정산 상태 Select */}
          <div className="floating-wrapper w-40 flex-shrink-0">
            <select 
              id="settlementStatus" 
              className={`floating-input ${searchFilters.settlementStatus ? 'has-value' : ''}`}
              value={searchFilters.settlementStatus}
              onChange={(e) => setSearchFilters({...searchFilters, settlementStatus: e.target.value})}
            >
              <option value="" disabled></option>
              <option value="pending">정산 대기</option>
              <option value="completed">정산 완료</option>
              <option value="cancelled">정산 취소</option>
            </select>
            <label className="floating-label">정산 상태</label>
            {searchFilters.settlementStatus && (
              <span 
                className="select-clear" 
                onClick={() => setSearchFilters({...searchFilters, settlementStatus: ''})}
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
                className={`floating-input pr-10 ${searchFilters.startDate ? 'has-value' : ''}`}
                value={searchFilters.startDate}
                onChange={(e) => setSearchFilters({...searchFilters, startDate: e.target.value})}
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
                className={`floating-input pr-10 ${searchFilters.endDate ? 'has-value' : ''}`}
                value={searchFilters.endDate}
                onChange={(e) => setSearchFilters({...searchFilters, endDate: e.target.value})}
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
              조회
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        /* 플로팅 라벨 컨테이너 */
        .floating-wrapper {
          position: relative;
          display: inline-block;
        }

        /* Input/Select 기본 스타일 */
        .floating-input {
          width: 100%;
          height: 44px;
          padding: 12px 12px 4px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 14px;
          color: #111827;
          background: white;
          transition: all 0.2s;
        }

        /* Select 화살표 위치 조정 */
        select.floating-input {
          padding-right: 36px;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 1.5em;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }
        
        /* IE용 기본 화살표 숨기기 */
        select.floating-input::-ms-expand {
          display: none;
        }
        
        /* 드롭다운 옵션 스타일 */
        select.floating-input option {
          padding: 8px 12px;
          border: 1px solid #E5E7EB;
        }

        /* Select에 값이 있을 때 X 버튼 표시를 위한 여백 */
        select.floating-input.has-value {
          padding-right: 60px;
        }

        .floating-input:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Select 초기화 버튼 */
        .select-clear {
          position: absolute;
          right: 32px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          background: #9CA3AF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .select-clear:hover {
          background: #6B7280;
        }

        .select-clear::before,
        .select-clear::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 2px;
          background: white;
        }

        .select-clear::before {
          transform: rotate(45deg);
        }

        .select-clear::after {
          transform: rotate(-45deg);
        }

        /* 라벨 기본 스타일 - 입력창 가운데 */
        .floating-label {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #9CA3AF;
          pointer-events: none;
          transition: all 0.2s ease;
          background: white;
          padding: 0 4px;
        }

        /* Date input의 라벨은 항상 위에 (날짜 텍스트와 겹침 방지) */
        input[type="date"] + .floating-label {
          top: -8px;
          transform: translateY(0);
          font-size: 12px;
          font-weight: 500;
          color: #6B7280;
        }

        /* 값이 있거나 포커스 시 라벨이 위로 이동 */
        .floating-input:focus + .floating-label,
        .floating-input.has-value + .floating-label {
          top: -8px;
          transform: translateY(0);
          font-size: 12px;
          font-weight: 500;
          color: #6B7280;
        }

        .floating-input:focus + .floating-label {
          color: #3B82F6;
        }

        /* Date input 아이콘 */
        .date-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #9CA3AF;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        /* 퀵 버튼 스타일 */
        .quick-btn {
          height: 44px;
          padding: 0 20px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.15s;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quick-btn.active {
          background: #111827;
          color: white;
          border: 1px solid #111827;
        }

        .quick-btn:not(.active) {
          background: white;
          color: #111827;
          border: 1px solid #D1D5DB;
        }

        .quick-btn:not(.active):hover {
          background: #111827;
          color: white;
          border-color: #111827;
        }

        .quick-btn.active:hover {
          background: #374151;
          border-color: #374151;
        }

        /* 액션 버튼 스타일 */
        .action-btn {
          height: 44px;
          padding: 0 24px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.2s;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .btn-reset {
          background: white;
          border: 1px solid #D1D5DB;
          color: #6B7280;
        }

        .btn-reset:hover {
          background: #F9FAFB;
          border-color: #9CA3AF;
        }

        .btn-submit {
          background: #3B82F6;
          border: none;
          color: white;
        }

        .btn-submit:hover {
          background: #2563EB;
        }
      `}</style>


      {/* 테이블 영역 */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* 테이블 헤더 액션 */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              총 <span className="font-semibold text-gray-900">{displayData.length}</span>건
            </span>
            {selectedItems.length > 0 && (
              <span className="text-sm text-blue-600">
                ({selectedItems.length}건 선택됨)
              </span>
            )}
            {selectedSeller && (
              <span className="text-sm text-blue-600">
                · {settlementData.find(s => s.seller_id === selectedSeller)?.seller_name}의 주문
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Excel 다운로드
            </button>
            {selectedItems.length > 0 && activeView === 'seller' && (
              <button className="btn btn-primary text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                선택 항목 정산 생성
              </button>
            )}
          </div>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          {activeView === 'seller' ? (
            // 셀러별 집계 테이블
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === settlementData.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">판매자 ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">판매자명</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">구분</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">총 거래</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">정상</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">보류</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">합격</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">불합격</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">보관</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">평균시간</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">판매금액</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">수수료 종류</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">수수료</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">정산금액</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* 합계 행 */}
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      disabled
                      className="rounded border-gray-300 opacity-50"
                    />
                  </td>
                  <td className="px-3 py-3" colSpan="2">
                    <div className="text-sm font-bold text-gray-900">총 합계</div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm text-gray-700">{filteredSellerData.length}명</span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {filteredSellerData.reduce((sum, item) => sum + item.total_count, 0)}건
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {filteredSellerData.reduce((sum, item) => sum + item.normal_count, 0)}건
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-orange-600">
                      {filteredSellerData.reduce((sum, item) => sum + item.hold_count, 0)}건
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-green-600">
                      {filteredSellerData.reduce((sum, item) => sum + item.inspection_pass, 0)}건
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-red-600">
                      {filteredSellerData.reduce((sum, item) => sum + item.inspection_fail, 0)}건
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {filteredSellerData.reduce((sum, item) => sum + item.storage_count, 0)}건
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(filteredSellerData.reduce((sum, item) => sum + item.total_amount, 0))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-xs text-gray-600">-</div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(filteredSellerData.reduce((sum, item) => sum + item.fee, 0))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-base font-bold text-blue-600">
                      {formatCurrency(filteredSellerData.reduce((sum, item) => sum + item.net_amount, 0))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                </tr>

                {/* 데이터 행 */}
                {paginatedData.map((item) => {
                  const status = getStatusBadge(item.status)
                  const sellerType = getSellerTypeBadge(item.seller_type)
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm text-gray-600 font-mono">{item.seller_id}</div>
                      </td>
                      <td className="px-3 py-3">
                        <button
                          onClick={() => {
                            setActiveView('order')
                            setSelectedSeller(item.seller_id)
                          }}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {item.seller_name}
                        </button>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${sellerType.class}`}>
                          {item.seller_type}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm text-gray-900">{item.total_count}건</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm text-gray-900">{item.normal_count}건</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm text-orange-600 font-medium">{item.hold_count}건</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm text-green-600 font-medium">{item.inspection_pass}건</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm text-red-600 font-medium">{item.inspection_fail}건</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm font-medium text-gray-900">{item.storage_count}건</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="text-sm text-gray-600">{item.avg_inspection_time}</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm text-gray-900">{formatCurrency(item.total_amount)}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="text-xs text-gray-600">{item.fee_type}</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(item.fee)}</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-base font-bold text-blue-600">{formatCurrency(item.net_amount)}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`badge ${status.class}`}>{status.label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            // 주문 상세 테이블
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">주문번호</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">판매자 ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">판매자명</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">구분</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">상품명</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">사이즈</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">결제일</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">주문상태</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">검수상태</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">수량</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">판매금액</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">수수료 종류</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">수수료</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700">정산금액</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-700">상태</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">구매자</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* 합계 행 */}
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      disabled
                      className="rounded border-gray-300 opacity-50"
                    />
                  </td>
                  <td className="px-3 py-3" colSpan="4">
                    <div className="text-sm font-bold text-gray-900">총 합계 ({filteredOrderData.length}건)</div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {filteredOrderData.reduce((sum, item) => sum + item.quantity, 0)}개
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(filteredOrderData.reduce((sum, item) => sum + item.product_price, 0))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-xs text-gray-600">-</div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(filteredOrderData.reduce((sum, item) => sum + item.fee, 0))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="text-base font-bold text-blue-600">
                      {formatCurrency(filteredOrderData.reduce((sum, item) => sum + item.net_amount, 0))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                </tr>

                {/* 데이터 행 */}
                {paginatedData.map((item) => {
                  const orderStatus = getOrderStatusBadge(item.order_status)
                  const sellerType = getSellerTypeBadge(item.seller_type)
                  const inspectionStatus = getOrderStatusBadge(item.inspection_status)
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm font-mono font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          {item.order_number}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-xs text-gray-500">{item.seller_id}</div>
                      </td>
                      <td className="px-3 py-3">
                        <button
                          onClick={() => {
                            setActiveView('seller')
                            setSelectedSeller(null)
                          }}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600"
                        >
                          {item.seller_name}
                        </button>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${sellerType.class}`}>
                          {item.seller_type}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={item.product_name}>
                          {item.product_name}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="text-sm text-gray-600">{item.product_size}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="text-sm text-gray-900">{item.payment_date}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${orderStatus.class}`}>
                          {item.order_status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${inspectionStatus.class}`}>
                          {item.inspection_status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm text-gray-900">{item.quantity}개</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm text-gray-900">{formatCurrency(item.product_price)}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="text-xs text-gray-600">{item.fee_type}</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(item.fee)}</div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="text-base font-bold text-blue-600">{formatCurrency(item.net_amount)}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="badge badge-pending">정산 대기</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm text-gray-900">{item.buyer_name}</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* 페이지네이션 */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {startIndex + 1}-{Math.min(endIndex, displayData.length)} / 총 {displayData.length}건
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10개씩 보기</option>
              <option value={50}>50개씩 보기</option>
              <option value={100}>100개씩 보기</option>
              <option value={200}>200개씩 보기</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


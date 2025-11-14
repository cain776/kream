// 메뉴 설정 통합 관리
export const menuConfig = [
  {
    path: '/',
    label: '대시보드',
    icon: '📊',
    title: '대시보드',
    description: '정산 현황을 한눈에 확인하세요'
  },
  {
    path: '/settlements',
    label: '정산',
    icon: '💰',
    subMenu: [
      {
        path: '/settlements/domestic-c2c',
        label: '국내 C2C',
        icon: '🇰🇷',
        title: '국내 C2C 정산',
        description: '개인간 국내 거래 정산을 관리합니다'
      },
      {
        path: '/settlements/overseas-cbt',
        label: '해외 CBT',
        icon: '🌏',
        title: '해외 CBT 정산',
        description: '국경간 거래 정산을 관리합니다'
      },
      {
        path: '/settlements/wms',
        label: '국내외 WMS',
        icon: '🏢',
        title: '국내외 WMS 정산',
        description: '창고관리 시스템 거래를 관리합니다'
      }
    ]
  },
  {
    path: '/transactions',
    label: '거래 내역',
    icon: '📋',
    title: '거래 내역',
    description: '모든 거래 내역을 조회합니다',
    subMenu: [
      {
        path: '/transactions/manual',
        label: '수기 등록',
        icon: '✏️',
        title: '수기 등록',
        description: '거래를 수동으로 등록합니다'
      },
      {
        path: '/transactions/all',
        label: '전체 내역 확인',
        icon: '📄',
        title: '전체 내역 확인',
        description: '모든 거래 내역을 조회합니다'
      }
    ]
  },
  {
    path: '/holds',
    label: '보류',
    icon: '⚠️',
    title: '보류',
    description: '보류된 정산 건을 관리합니다'
  },
  {
    path: '/invoice',
    label: '인보이스',
    icon: '📄',
    title: '인보이스',
    description: '인보이스 생성 및 발송을 관리합니다',
    subMenu: [
      {
        path: '/invoice/create',
        label: '인보이스 생성',
        icon: '✏️',
        title: '인보이스 생성',
        description: '새로운 인보이스를 생성합니다'
      },
      {
        path: '/invoice/list',
        label: '인보이스 목록',
        icon: '📋',
        title: '인보이스 목록',
        description: '생성된 인보이스 목록을 조회합니다'
      },
      {
        path: '/invoice/preview',
        label: '인보이스 미리보기/출력',
        icon: '🖨️',
        title: '인보이스 미리보기/출력',
        description: '인보이스를 미리보고 출력합니다'
      },
      {
        path: '/invoice/send',
        label: '인보이스 발송',
        icon: '📤',
        title: '인보이스 발송',
        description: '인보이스를 고객사에 발송합니다'
      }
    ]
  },
  {
    path: '/subsidiary-materials',
    label: '부자재',
    icon: '📦',
    title: '부자재',
    description: '부자재 코드 및 사용 내역을 관리합니다',
    subMenu: [
      {
        path: '/subsidiary-materials/code',
        label: '코드',
        icon: '🔖',
        title: '부자재 코드',
        description: '부자재 코드를 등록하고 관리합니다'
      },
      {
        path: '/subsidiary-materials/price',
        label: '단가',
        icon: '💰',
        title: '부자재 단가',
        description: '부자재별 단가를 설정하고 관리합니다'
      },
      {
        path: '/subsidiary-materials/usage',
        label: '사용 내역',
        icon: '📊',
        title: '부자재 사용 내역',
        description: '부자재 사용 내역을 조회합니다'
      },
      {
        path: '/subsidiary-materials/statistics',
        label: '통계',
        icon: '📈',
        title: '부자재 통계',
        description: '부자재별 사용량 및 비용 통계를 확인합니다'
      }
    ]
  },
  {
    path: '/delivery',
    label: '배송비',
    icon: '🚚',
    title: '배송비',
    description: '배송비 요금표 및 정산을 관리합니다',
    subMenu: [
      {
        path: '/delivery/rate',
        label: '배송사 요금표',
        icon: '📋',
        title: '배송사 요금표',
        description: '배송사별 요금표를 등록하고 관리합니다'
      },
      {
        path: '/delivery/entry',
        label: '내역 입력',
        icon: '✏️',
        title: '배송비 내역 입력',
        description: '배송비 청구 내역을 입력합니다'
      },
      {
        path: '/delivery/settlement',
        label: '정산',
        icon: '💸',
        title: '배송비 정산',
        description: '배송비를 정산하고 관리합니다'
      },
      {
        path: '/delivery/statistics',
        label: '통계',
        icon: '📊',
        title: '배송비 통계',
        description: '배송비 현황 및 통계를 확인합니다'
      }
    ]
  },
  {
    path: '/compensation',
    label: '보상비',
    icon: '💸',
    title: '보상비',
    description: '보상 항목 및 내역을 관리합니다',
    subMenu: [
      {
        path: '/compensation/items',
        label: '보상 항목',
        icon: '📝',
        title: '보상 항목',
        description: '보상 항목을 등록하고 관리합니다'
      },
      {
        path: '/compensation/entry',
        label: '내역 입력',
        icon: '✏️',
        title: '보상 내역 입력',
        description: '보상 내역을 입력합니다'
      },
      {
        path: '/compensation/statistics',
        label: '통계',
        icon: '📈',
        title: '보상 통계',
        description: '보상비 현황 및 통계를 확인합니다'
      }
    ]
  },
  {
    path: '/statistics',
    label: '통계/리포트',
    icon: '📈',
    title: '통계',
    description: '정산 통계 및 분석 데이터를 확인합니다',
    subMenu: [
      {
        path: '/statistics/by-item',
        label: '항목별 통계',
        icon: '📊',
        title: '항목별 통계',
        description: '정산 항목별 상세 통계 및 분석'
      },
      {
        path: '/statistics/by-client',
        label: '거래처별 통계',
        icon: '🏢',
        title: '거래처별 통계',
        description: '거래처별 정산 현황 및 추이 분석'
      },
      {
        path: '/statistics/trend',
        label: '트렌드 분석',
        icon: '📈',
        title: '트렌드 분석',
        description: '정산 데이터의 시계열 추이 및 성장률 분석'
      },
      {
        path: '/statistics/custom-report',
        label: '커스텀 리포트',
        icon: '📋',
        title: '커스텀 리포트',
        description: '원하는 형식으로 리포트 생성 및 다운로드'
      }
    ]
  },
  {
    path: '/master',
    label: '기초코드',
    icon: '📋',
    subMenu: [
      {
        path: '/master/user-code',
        label: '사용자 코드',
        icon: '👤',
        title: '사용자 코드',
        description: '시스템 사용자 정보를 관리합니다'
      },
      {
        path: '/master/fee-code',
        label: '수수료 코드',
        icon: '💵',
        title: '수수료 코드',
        description: '수수료 정책 및 코드를 관리합니다'
      },
      {
        path: '/master/client-code',
        label: '고객사 코드',
        icon: '🏢',
        title: '고객사 코드',
        description: '거래 고객사 정보를 관리합니다'
      },
      {
        path: '/master/delivery-code',
        label: '택배사 코드',
        icon: '🚚',
        title: '택배사 코드',
        description: '배송 택배사 정보를 관리합니다'
      }
    ]
  },
  {
    path: '/system',
    label: '시스템',
    icon: '⚙️',
    subMenu: [
      {
        path: '/system/client-management',
        label: '고객사',
        icon: '🏢',
        title: '고객사 관리',
        description: '고객사 정보를 관리합니다'
      },
      {
        path: '/system/user-management',
        label: '사용자',
        icon: '👥',
        title: '사용자 관리',
        description: '시스템 사용자를 관리합니다'
      },
      {
        path: '/system/permission',
        label: '권한',
        icon: '🔐',
        title: '권한 관리',
        description: '사용자 권한을 설정합니다'
      },
      {
        path: '/system/code-management',
        label: '코드',
        icon: '🔧',
        title: '코드 관리',
        description: '시스템 공통 코드를 관리합니다'
      },
      {
        path: '/system/audit-log',
        label: '감사 로그',
        icon: '📜',
        title: '감사 로그',
        description: '시스템 사용 이력을 조회합니다'
      }
    ]
  }
]

// 메뉴 데이터를 평탄화하여 모든 경로의 정보를 가져오기
export const getAllMenuItems = () => {
  const items = []
  
  menuConfig.forEach(menu => {
    // 메인 메뉴 추가
    items.push({
      path: menu.path,
      label: menu.label,
      icon: menu.icon,
      title: menu.title,
      description: menu.description
    })
    
    // 서브 메뉴 추가
    if (menu.subMenu) {
      menu.subMenu.forEach(subMenu => {
        items.push({
          path: subMenu.path,
          label: subMenu.label,
          icon: subMenu.icon,
          title: subMenu.title,
          description: subMenu.description
        })
      })
    }
  })
  
  return items
}

// 경로로 페이지 정보 가져오기
export const getPageInfo = (pathname) => {
  const allItems = getAllMenuItems()
  const item = allItems.find(item => item.path === pathname)
  return item ? { title: item.title, description: item.description } : { title: '', description: '' }
}

